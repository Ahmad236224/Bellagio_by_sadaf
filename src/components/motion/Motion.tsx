"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/motion";

/**
 * One scroll-motion system for the whole page, driven by data attributes so
 * sections can stay server components:
 *   data-reveal="lines"  — masked heading lines rise in sequence
 *   data-reveal="clip"   — media unveils upward through a clip-path
 *   data-reveal="fade"   — soft fade + rise
 *   data-parallax="0.12" — gentle scrubbed drift (desktop only)
 *   data-delay="0.2"     — optional stagger offset for any reveal
 */
export default function Motion() {
  useEffect(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const delay = (el: Element) => parseFloat((el as HTMLElement).dataset.delay ?? "0");

      gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        const spans = el.querySelectorAll(".line > span");
        gsap.set(spans, { yPercent: 110, y: 0 });
        gsap.to(spans, {
          yPercent: 0,
          duration: 1.3,
          stagger: 0.11,
          delay: delay(el),
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="clip"]').forEach((el) => {
        // Scale the wrapper, not the <img>, so it never fights the CSS hover zoom.
        const media = el.firstElementChild;
        const tl = gsap.timeline({
          delay: delay(el),
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" });
        if (media) tl.from(media, { scale: 1.18, duration: 2, ease: "power3.out" }, 0);
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: delay(el),
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
        });
      });
    });

    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "0.1") * 100;
        gsap.fromTo(
          el,
          { yPercent: -amt / 2 },
          {
            yPercent: amt / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });

    // Fonts and lazy media shift layout — re-measure once things settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      mm.revert();
    };
  }, []);

  return null;
}
