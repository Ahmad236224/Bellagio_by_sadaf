"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 1.2 });
}

export { gsap, ScrollTrigger };

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const isMobile = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

/* ─── Shared Lenis instance, so anchors and menus can scroll smoothly ─── */
let lenis: Lenis | null = null;

export const smooth = {
  set(l: Lenis | null) {
    lenis = l;
  },
  stop: () => lenis?.stop(),
  start: () => lenis?.start(),
  to(target: string | HTMLElement) {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6, offset: 0 });
    else el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
  },
};
