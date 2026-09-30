"use client";

import { useEffect, useRef } from "react";
import Img from "@/components/media/Img";
import Video from "@/components/media/Video";
import { P, V } from "@/lib/media";
import { gsap, reducedMotion } from "@/lib/motion";

/**
 * Split screen: hair film left, makeup still right. As the section scrolls in,
 * each half opens from a narrow centre slit toward full bleed.
 */
export default function SplitBeauty() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 15%", scrub: 0.8 },
        });
        tl.fromTo(q("[data-split=left]"), { clipPath: "inset(12% 0% 12% 30%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
          .fromTo(q("[data-split=right]"), { clipPath: "inset(12% 30% 12% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
          .fromTo(q("[data-split-media]"), { scale: 1.2 }, { scale: 1, ease: "none" }, 0);
      });
      mm.add("(max-width: 767px)", () => {
        q("[data-split]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(10% 10% 10% 10%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 40%", scrub: 0.6 } }
          );
        });
      });
      gsap.from(q("[data-split-text]"), {
        y: 40,
        opacity: 0,
        duration: 1.3,
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 40%", toggleActions: "play none none none" },
      });
    }, root);
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} className="grid bg-espresso text-cream md:h-[100svh] md:min-h-[640px] md:grid-cols-2">
      <div data-split="left" data-cursor="PLAY" className="relative h-[80svh] overflow-hidden md:h-full">
        <div data-split-media className="absolute inset-0">
          <Video clip={V.hairPlay} className="warm" toggle />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/5 to-transparent" />
        <div data-split-text className="absolute inset-x-0 bottom-0 p-[var(--gutter)] pb-12 md:pb-16">
          <p className="eyebrow mb-4 text-[0.6rem] text-champagne">Hair</p>
          <h3 className="display text-[clamp(2.6rem,4.6vw,4.4rem)]">
            Movement makes <em className="text-blush">the look.</em>
          </h3>
        </div>
      </div>
      <div data-split="right" data-cursor="VIEW" className="relative h-[80svh] overflow-hidden md:h-full">
        <div data-split-media className="absolute inset-0">
          <Img photo={P.mkShadow} sizes="(min-width: 768px) 50vw, 100vw" className="warm" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/5 to-transparent" />
        <div data-split-text className="absolute inset-x-0 bottom-0 p-[var(--gutter)] pb-12 md:pb-16">
          <p className="eyebrow mb-4 text-[0.6rem] text-champagne">Makeup</p>
          <h3 className="display text-[clamp(2.6rem,4.6vw,4.4rem)]">
            Polished, <em className="text-blush">never overdone.</em>
          </h3>
        </div>
      </div>
    </section>
  );
}
