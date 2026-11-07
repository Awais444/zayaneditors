"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav } from "@/data/site";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, bounce: 0, duration: 0.35 };

/** Slim nav data passed from the server layout, so the full service copy never ships to the browser. */
export type NavGroup = { name: string; items: { slug: string; name: string }[] };

export function Header({ groups }: { groups: NavGroup[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const focusFirst = useRef(false);
  const [originX, setOriginX] = useState(0);
  const [headerBottom, setHeaderBottom] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(false);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        setMobile(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobile]);

  // Hover intent: open after 120ms, close after a 200ms grace period (diagonal mouse travel)
  const openMega = () => {
    clearTimeout(closeTimer.current);
    clearTimeout(openTimer.current);
    if (!mega) openTimer.current = setTimeout(() => setMega(true), 120);
  };
  const closeMega = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), 200);
  };
  const hoverOnly = (fn: () => void) => (e: React.PointerEvent) => e.pointerType === "mouse" && fn();

  const closeAndFocusTrigger = () => {
    setMega(false);
    triggerRef.current?.focus();
  };

  // Measure trigger position (transform-origin) and header bottom (scrim top) on open
  const measure = () => {
    const t = triggerRef.current?.getBoundingClientRect();
    const p = headerRef.current?.getBoundingClientRect();
    if (t && p) {
      setOriginX(t.left + t.width / 2);
      setHeaderBottom(p.bottom);
    }
  };

  const links = () => Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      measure();
      focusFirst.current = true;
      setMega(true);
    }
  };

  // Focus trap + arrow-key navigation inside the panel
  const onPanelKey = (e: React.KeyboardEvent) => {
    const items = links();
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape") {
      e.preventDefault();
      closeAndFocusTrigger();
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Tab") {
      e.preventDefault();
      items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
    }
  };

  useEffect(() => {
    if (mega && focusFirst.current) {
      focusFirst.current = false;
      requestAnimationFrame(() => links()[0]?.focus());
    }
    if (!mega) return;
    // Lock page scroll while open on small screens only
    const small = window.matchMedia("(max-width: 1023px)").matches;
    if (small) document.documentElement.style.overflow = "hidden";
    return () => {
      if (small) document.documentElement.style.overflow = "";
    };
  }, [mega]);

  return (
    <header ref={headerRef} data-cursor-occlude className="sticky top-0 z-50">
      <div className={cn("chrome transition-shadow duration-300", scrolled && "shadow-[0_12px_24px_-12px_rgb(0_0_0/0.8)]")}>
        <div className="container-x flex h-16 items-center justify-between gap-6 md:h-18">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              "mega" in item ? (
                <div
                  key={item.href}
                  className="relative"
                  onPointerEnter={hoverOnly(() => {
                    measure();
                    openMega();
                  })}
                  onPointerLeave={hoverOnly(closeMega)}
                >
                  <button
                    ref={triggerRef}
                    type="button"
                    aria-expanded={mega}
                    aria-controls="mega-menu"
                    aria-haspopup="true"
                    onKeyDown={onTriggerKey}
                    onClick={(e) => {
                      // keyboard activation is handled in onKeyDown
                      if (e.detail === 0) return;
                      clearTimeout(openTimer.current);
                      clearTimeout(closeTimer.current);
                      measure();
                      setMega((v) => !v);
                    }}
                    className="pressable flex h-10 items-center gap-1 rounded-full px-4 text-sm font-medium text-muted hover:text-fg"
                  >
                    {item.label}
                    <ChevronDown className={cn("size-4 transition-transform duration-300", mega && "rotate-180")} aria-hidden />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("pressable rounded-full px-4 py-2 text-sm font-medium text-muted hover:text-fg", pathname.startsWith(item.href) && "text-fg")}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Magnetic>
                <Button href="/contact">Start a Project</Button>
              </Magnetic>
            </div>
            <button
              type="button"
              className="pressable grid size-11 place-items-center rounded-full border border-line lg:hidden"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((v) => !v)}
            >
              {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scrim: below the header, fades with the menu, click closes */}
      <AnimatePresence>
        {mega && (
          <motion.div
            key="scrim"
            aria-hidden
            className="fixed inset-x-0 bottom-0 z-40 hidden bg-black/50 lg:block"
            style={{ top: headerBottom }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMega(false)}
          />
        )}
      </AnimatePresence>

      {/* Mega menu: scales from the Services trigger; interruptible (AnimatePresence reverses from current values) */}
      <AnimatePresence>
        {mega && (
          <motion.div
            key="mega"
            id="mega-menu"
            onPointerEnter={hoverOnly(openMega)}
            onPointerLeave={hoverOnly(closeMega)}
            onKeyDown={onPanelKey}
            className="absolute inset-x-0 top-full z-50 hidden lg:block"
            style={{ transformOrigin: `${originX}px 0px` }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0, duration: 0.25 }}
          >
            <div className="container-x pt-2">
              <div ref={panelRef} aria-label="Services" className="mega-panel grid max-h-[calc(100dvh-8rem)] grid-cols-6 gap-x-5 gap-y-6 overflow-y-auto overscroll-contain rounded-2xl p-7">
                {groups.map(({ name: cat, items }) => (
                  <div key={cat}>
                    <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-muted uppercase">{cat}</p>
                    <ul className="space-y-1.5">
                      {items.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/${s.slug}`} className="block rounded-md py-1 text-sm text-muted transition-colors hover:text-fg">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-6 flex items-center justify-between border-t border-line pt-5 text-sm">
                  <span className="text-muted">Not sure what you need? We&apos;ll recommend a plan.</span>
                  <Link href="/services" className="font-semibold hover:text-accent">
                    All services →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            className="chrome mobile-menu fixed inset-0 -z-10 h-dvh overflow-y-auto overscroll-contain pt-24 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.nav
              aria-label="Mobile"
              className="container-x flex flex-col gap-1 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
              initial={reduce ? false : { y: -12 }}
              animate={{ y: 0 }}
              exit={reduce ? undefined : { y: -12 }}
              transition={spring}
            >
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="display border-b border-line py-4 text-3xl font-semibold active:text-accent">
                  {item.label}
                </Link>
              ))}
              <details className="group border-b border-line py-4">
                <summary className="flex list-none items-center justify-between text-lg text-muted [&::-webkit-details-marker]:hidden">
                  Browse all services <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {groups.map(({ name: cat, items }) => (
                    <div key={cat}>
                      <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-muted uppercase">{cat}</p>
                      {items.map((s) => (
                        <Link key={s.slug} href={`/${s.slug}`} className="block py-1.5 text-muted active:text-fg">
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
              <Button href="/contact" size="lg" className="mt-6 w-full">
                Start a Project
              </Button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
