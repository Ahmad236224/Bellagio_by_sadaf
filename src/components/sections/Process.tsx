"use client";

import { useEffect, useRef, useState } from "react";
import Img from "@/components/media/Img";
import Lines from "@/components/ui/Lines";
import { P, type Photo } from "@/lib/media";
import { gsap, reducedMotion } from "@/lib/motion";

const steps: { name: string; copy: string; photo: Photo }[] = [
  { name: "Consult", copy: "We talk through the occasion, your outfit, your jewellery and how you want to feel.", photo: P.mkPalette },
  { name: "Prepare", copy: "Skin is cleansed, calmed and primed so everything that follows sits beautifully.", photo: P.skMist },
  { name: "Create", copy: "Hair and makeup are built in layers, balanced to your features and your light.", photo: P.hrCurl },
  { name: "Refine", copy: "Every detail is checked up close — liner, lashes, pins and placement.", photo: P.mkWing },
  { name: "Reveal", copy: "The dupatta is set, the final touches are made, and you step into your moment.", photo: P.baraatRegal },
];

/**
 * Pinned storytelling on desktop: the section holds while five steps advance —
 * text, image and the progress line change together. Mobile gets a calm stacked list.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.2}`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999));
            setActive(i);
          },
        },
      });
      st.fromTo(bar.current, { scaleY: 0 }, { scaleY: 1, ease: "none" });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-espresso text-cream">
      {/* Desktop pinned story */}
      <div ref={pin} className="relative hidden h-[100svh] min-h-[640px] overflow-hidden md:block">
        <div className="px-gutter grid h-full grid-cols-12 gap-8 py-24">
          <div className="col-span-5 flex flex-col justify-between">
            <div>
              <p className="eyebrow mb-8 flex items-center gap-4 text-blush/80">
                <span className="h-px w-10 bg-champagne" />
                The experience
              </p>
              <Lines className="text-[clamp(2.8rem,4.6vw,4.6rem)]" lines={["From consultation", <em key="p" className="text-blush">to final touch.</em>]} />
            </div>

            <div className="flex gap-10">
              {/* Progress */}
              <div className="relative w-px shrink-0 bg-cream/15">
                <span ref={bar} className="absolute inset-0 origin-top scale-y-0 bg-champagne" />
              </div>
              <ol className="flex flex-col gap-3">
                {steps.map((s, i) => (
                  <li
                    key={s.name}
                    className={`eyebrow flex items-center gap-5 text-[0.64rem] transition-colors duration-700 ${i === active ? "text-cream" : "text-cream/35"}`}
                  >
                    <span className={i <= active ? "text-champagne" : ""}>0{i + 1}</span>
                    {s.name}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="relative col-span-7 grid grid-cols-7 items-end gap-8">
            {/* Step text */}
            <div className="relative col-span-3 h-[16rem] self-center">
              {steps.map((s, i) => (
                <div
                  key={s.name}
                  className={`absolute inset-0 transition-all duration-[900ms] ease-silk ${
                    i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0"
                  }`}
                  aria-hidden={i !== active}
                >
                  <p className="display text-[5.5rem] leading-none text-champagne/90">0{i + 1}</p>
                  <h3 className="display mt-3 text-[2.6rem]">{s.name}</h3>
                  <p className="mt-4 max-w-[28ch] text-cream/70">{s.copy}</p>
                </div>
              ))}
            </div>
            {/* Step imagery */}
            <div className="relative col-span-4 aspect-[3/4] self-center overflow-hidden">
              {steps.map((s, i) => (
                <div
                  key={s.name}
                  className="absolute inset-0 transition-[clip-path] duration-[1200ms] ease-curtain"
                  style={{ clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)", zIndex: i }}
                >
                  <div className={`absolute inset-0 transition-transform duration-[1800ms] ease-silk ${i === active ? "scale-100" : "scale-110"}`}>
                    <Img photo={s.photo} sizes="36vw" className="warm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked */}
      <div className="px-gutter py-28 md:hidden">
        <p data-reveal="fade" className="eyebrow mb-8 flex items-center gap-4 text-blush/80">
          <span className="h-px w-10 bg-champagne" />
          The experience
        </p>
        <Lines className="text-[3.25rem]" lines={["From consultation", <em key="p" className="text-blush">to final touch.</em>]} />
        <ol className="mt-16 flex flex-col gap-16 border-l border-cream/15 pl-6">
          {steps.map((s, i) => (
            <li key={s.name} className="relative">
              <span className="absolute -left-[1.72rem] top-2 h-2 w-2 rounded-full bg-champagne" />
              <div data-reveal="clip" className="relative mb-6 aspect-[4/5] overflow-hidden">
                <Img photo={s.photo} sizes="85vw" className="warm" />
              </div>
              <p className="eyebrow text-[0.6rem] text-champagne">0{i + 1}</p>
              <h3 className="display mt-2 text-[2.4rem]">{s.name}</h3>
              <p className="mt-3 text-cream/70">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
