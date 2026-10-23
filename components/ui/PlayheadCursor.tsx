"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * "Playhead" cursor. Fine-pointer devices only (the loader never imports this on touch or reduced motion).
 * - Dot: positioned directly in the pointermove handler — exactly 1:1, no spring, no transition.
 * - Ring/pill: one rAF loop with critically damped springs, refs only (no React render per frame).
 * - No layout reads inside the loop; card rects are measured on pointermove/scroll.
 * States come from `data-cursor` attributes: link (auto for a/button), play, drag, hide.
 * Never cursor-less: whenever the custom cursor is not showing (hide/native targets, an open
 * modal dialog, window blur, pointer outside the window) <html> gets .playhead-native and the
 * native cursor is used instead.
 */

type State = "default" | "link" | "play" | "drag" | "hide" | "native";

/** Critically damped spring (no overshoot). Exact solution per step, stable at any frame rate. */
class Spring {
  v: number;
  vel = 0;
  t: number;
  constructor(v: number, private w = 40) {
    this.v = v;
    this.t = v;
  }
  step(dt: number) {
    const x = this.v - this.t;
    const e = Math.exp(-this.w * dt);
    const c = this.vel + this.w * x;
    this.v = this.t + (x + c * dt) * e;
    this.vel = (this.vel - c * this.w * dt) * e;
    return Math.abs(this.v - this.t) > 0.01 || Math.abs(this.vel) > 0.05;
  }
  snap(v: number) {
    this.v = this.t = v;
    this.vel = 0;
  }
}

const LINK_SELECTOR = "a, button, [role=button], summary, label[for]";
const NATIVE_SELECTOR = "input, textarea, select, [contenteditable=true], [contenteditable=''], iframe";

export default function PlayheadCursor() {
  const [mounted, setMounted] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const razor = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLDivElement>(null);

  // Portal target only exists on the client
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !dot.current || !ring.current || !pill.current) return;
    const root = document.documentElement;

    // Centre each element on the pointer using its own half-size (measured once)
    const dotH = { x: dot.current.offsetWidth / 2, y: dot.current.offsetHeight / 2 };
    const ringH = { x: ring.current.offsetWidth / 2, y: ring.current.offsetHeight / 2 };
    const pillH = { x: pill.current.offsetWidth / 2, y: pill.current.offsetHeight / 2 };

    let px = 0, py = 0;
    let state: State = "default";
    let visible = false;
    let pressed = false;
    let card: Element | null = null;
    let cardRect: DOMRect | null = null;
    let squeeze = 0;

    // ~0.12s trail: critically damped settle ≈ 5.8 / w
    const rx = new Spring(0, 48), ry = new Spring(0, 48);
    const show = new Spring(0, 30);
    const dotO = new Spring(1, 40);
    const ringS = new Spring(1, 40);
    const ringO = new Spring(1, 40);
    const fillO = new Spring(0, 40);
    const pillO = new Spring(0, 40);
    const pillS = new Spring(0.4, 40);
    const razorO = new Spring(0, 28);
    const lineO = new Spring(0, 40);
    const springs = [rx, ry, show, dotO, ringS, ringO, fillO, pillO, pillS, razorO, lineO];

    const applyState = () => {
      const pillMode = state === "play" || state === "drag";
      dotO.t = state === "default" ? 1 : 0;
      ringO.t = state === "default" || state === "link" ? 1 : 0;
      ringS.t = (state === "link" ? 1.5 : 1) * (squeeze ? 0.85 : 1);
      fillO.t = state === "link" ? 1 : 0;
      pillO.t = pillMode ? 1 : 0;
      pillS.t = pillMode ? (pressed && state === "drag" ? 0.9 : 1) : 0.4;
      lineO.t = state === "play" ? 1 : 0;
      if (label.current) label.current.textContent = state === "drag" ? "⟷ DRAG" : "▶ PLAY";
    };

    // Any open modal dialog switches to the native cursor until it closes
    let modalOpen = false;
    const checkModal = () => {
      modalOpen = !!document.querySelector('[role="dialog"][aria-modal="true"]');
    };
    checkModal();

    const resolve = (el: Element | null): State => {
      card = null;
      if (modalOpen) return "native";
      if (!el) return "default";
      if (el.closest(NATIVE_SELECTOR)) return "native";
      const tagged = el.closest("[data-cursor]");
      if (tagged) {
        const v = tagged.getAttribute("data-cursor") as State;
        if (v === "play") card = tagged;
        return v;
      }
      return el.closest(LINK_SELECTOR) ? "link" : "default";
    };

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      let moving = false;
      for (const s of springs) moving = s.step(dt) || moving;
      const vis = show.v;

      dot.current!.style.opacity = String(vis * dotO.v);
      ring.current!.style.transform = `translate3d(${rx.v - ringH.x}px, ${ry.v - ringH.y}px, 0) scale(${ringS.v})`;
      ring.current!.style.opacity = String(vis * ringO.v);
      fill.current!.style.opacity = String(fillO.v);
      razor.current!.style.opacity = String(razorO.v);
      pill.current!.style.transform = `translate3d(${rx.v - pillH.x}px, ${ry.v - pillH.y}px, 0) scale(${pillS.v})`;
      pill.current!.style.opacity = String(vis * pillO.v);
      if (cardRect && state === "play") {
        const x = Math.min(cardRect.right - 1, Math.max(cardRect.left, px));
        line.current!.style.transform = `translate3d(${x - 1}px, ${cardRect.top}px, 0) scaleY(${cardRect.height})`;
      }
      line.current!.style.opacity = String(vis * lineO.v);

      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const placeDot = () => {
      dot.current!.style.transform = `translate3d(${px - dotH.x}px, ${py - dotH.y}px, 0)`;
    };

    const setVisible = (v: boolean) => {
      visible = v;
      show.t = v ? 1 : 0;
      // Native cursor takes over the moment ours is not shown
      root.classList.toggle("playhead-native", !v);
      kick();
    };

    const measureCard = () => {
      // The playhead line spans the media frame only (a [data-cursor-frame] child when present), never the title
      cardRect = card ? (card.querySelector("[data-cursor-frame]") ?? card).getBoundingClientRect() : null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      // Dot: 1:1, set immediately in the handler
      placeDot();
      rx.t = px;
      ry.t = py;
      const target = e.target as Element;
      const next = resolve(target);
      const shouldShow = next !== "hide" && next !== "native";
      // Reappearing: jump the ring to the pointer first — no fly-in
      if (!visible && shouldShow) {
        rx.snap(px);
        ry.snap(py);
      }
      state = next;
      measureCard();
      root.classList.remove("playhead-kbd");
      if (shouldShow !== visible) setVisible(shouldShow);
      applyState();
      kick();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pressed = true;
      razorO.snap(1);
      razorO.t = 0;
      squeeze = window.setTimeout(() => {
        squeeze = 0;
        applyState();
        kick();
      }, 100);
      applyState();
      kick();
    };
    const onUp = () => {
      pressed = false;
      applyState();
      kick();
    };
    let scrollRaf = 0;
    const onScroll = () => {
      scrollRaf ||= requestAnimationFrame(onScrollFrame);
    };
    // One hit-test per frame at most, not per scroll event
    const onScrollFrame = () => {
      scrollRaf = 0;
      // Content moved under a still pointer: re-resolve what's beneath it
      if (visible) {
        const el = document.elementFromPoint(px, py);
        const next = resolve(el);
        if (next !== state) {
          state = next;
          const shouldShow = next !== "hide" && next !== "native";
          if (shouldShow !== visible) setVisible(shouldShow);
          applyState();
          kick();
        }
      }
      measureCard();
    };
    // Left the window, or moved into an iframe (relatedTarget is null in both cases)
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        root.classList.add("playhead-kbd");
        setVisible(false);
      }
    };
    const onBlur = () => setVisible(false);
    const modalObserver = new MutationObserver(() => {
      const was = modalOpen;
      checkModal();
      if (was === modalOpen) return;
      state = modalOpen ? "native" : resolve(document.elementFromPoint(px, py));
      setVisible(!modalOpen && state !== "hide" && state !== "native" && px + py > 0);
      applyState();
    });
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else kick();
    };

    const opts = { passive: true } as const;
    window.addEventListener("pointermove", onMove, opts);
    window.addEventListener("pointerdown", onDown, opts);
    window.addEventListener("pointerup", onUp, opts);
    window.addEventListener("scroll", onScroll, opts);
    document.addEventListener("mouseout", onOut, opts);
    window.addEventListener("keydown", onKey, opts);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("blur", onBlur);
    modalObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-modal", "role"] });
    // Native stays on until the pointer first moves over the page and ours is shown
    root.classList.add("playhead-native");
    // Hide the native cursor only now that ours is mounted — never a moment with no cursor
    root.classList.add("has-playhead");

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      clearTimeout(squeeze);
      root.classList.remove("has-playhead", "playhead-kbd", "playhead-native");
      window.removeEventListener("blur", onBlur);
      modalObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mounted]);

  if (!mounted) return null;
  // Above everything (modals, toasts, mega-menu)
  const base = "pointer-events-none fixed top-0 left-0 z-[2147483000] opacity-0 will-change-transform";
  // Portal straight into <body> so no transformed/filtered ancestor can break position: fixed
  return createPortal(
    <div aria-hidden>
      <div ref={line} className={`${base} h-px w-0.5 origin-top bg-accent`} />
      <div ref={ring} className={`${base} size-9 rounded-full border-[1.5px] border-[rgba(244,244,245,0.5)] mix-blend-difference`}>
        <div ref={fill} className="absolute inset-0 rounded-full bg-[rgba(198,244,50,0.12)] opacity-0" />
        <div ref={razor} className="absolute -top-2 -bottom-2 left-1/2 w-px -translate-x-1/2 bg-accent opacity-0" />
      </div>
      <div ref={pill} className={`${base} grid h-9 w-22 place-items-center rounded-full bg-accent text-[11px] font-bold tracking-[0.12em] text-accent-fg`}>
        <span ref={label}>▶ PLAY</span>
      </div>
      <div ref={dot} className={`${base} size-2 rounded-full bg-accent shadow-[0_0_0_1px_rgba(11,12,14,0.6)]`} />
    </div>,
    document.body,
  );
}
