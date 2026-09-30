"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, smooth, reducedMotion } from "@/lib/motion";

/** Lenis smooth scrolling synced with GSAP's ticker, plus smooth in-page anchors. */
export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;

    if (!reducedMotion()) {
      lenis = new Lenis({ duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
      smooth.set(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      if (hash.length < 2 || !document.querySelector(hash)) return;
      e.preventDefault();
      smooth.to(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      smooth.set(null);
    };
  }, []);

  return null;
}
