"use client";
import { Toaster as Sonner } from "sonner";
import { useEffect, useState } from "react";

/** Bottom-center on mobile, bottom-right on desktop, dark theme matching tokens. */
export function Toaster() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setDesktop(mq.matches);
    const on = (e: MediaQueryListEvent) => setDesktop(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return (
    <Sonner
      theme="dark"
      position={desktop ? "bottom-right" : "bottom-center"}
      offset={{ bottom: 88 }}
      toastOptions={{ style: { background: "#15171b", border: "1px solid #262a31", color: "#f4f4f5" } }}
    />
  );
}
