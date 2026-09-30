"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, finePointer, reducedMotion } from "@/lib/motion";

/**
 * Desktop-only cursor: a thin champagne ring that follows the pointer and
 * opens into a soft disc with a label over [data-cursor="VIEW|BOOK|PLAY"].
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const el = ring.current!;
    document.documentElement.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.28 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    let current = "";
    let seen = false;
    const move = (e: PointerEvent) => {
      if (!seen) {
        seen = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.4 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const next = t?.dataset.cursor ?? "";
      if (next !== current) {
        current = next;
        setLabel(next);
        el.dataset.active = next ? "true" : "false";
        gsap.to(el, { scale: next ? 1 : 0.28, duration: 0.6, ease: "power3.out" });
      }
    };
    const hide = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    const show = () => gsap.to(el, { opacity: 1, duration: 0.3 });
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", hide);
    document.documentElement.addEventListener("pointerenter", show);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.removeEventListener("pointerenter", show);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      data-active="false"
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-champagne transition-colors duration-500 data-[active=true]:border-transparent data-[active=true]:bg-cream/85 data-[active=true]:backdrop-blur-sm [html.has-cursor_&]:flex"
    >
      <span className="eyebrow text-[0.58rem] tracking-[0.3em] text-espresso">{label}</span>
    </div>
  );
}
