"use client";

import { useState } from "react";
import Img from "@/components/media/Img";
import Lines from "@/components/ui/Lines";
import { P, type Photo } from "@/lib/media";

const looks: { name: string; note: string; photo: Photo }[] = [
  { name: "Nikkah", note: "Ivory, pearl and quiet radiance", photo: P.nikkahIvory },
  { name: "Mehndi", note: "Marigold warmth, playful glow", photo: P.mehndiYellow },
  { name: "Baraat", note: "Regal red, defined and timeless", photo: P.baraatNath },
  { name: "Walima", note: "Soft, luminous and refined", photo: P.walimaSoft },
  { name: "Engagement", note: "Modern glamour, lightly done", photo: P.engagePink },
];

/**
 * Five occasion panels. Desktop: an accordion row — the hovered panel widens,
 * its image eases in and the category note reveals. Mobile: a swipe rail.
 */
export default function BridalShowcase() {
  const [active, setActive] = useState(2);

  return (
    <section id="bridal" className="relative overflow-hidden bg-mocha py-28 text-cream md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,207,200,0.14),transparent_60%)]" />
      <div className="px-gutter relative mb-16 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p data-reveal="fade" className="eyebrow mb-8 flex items-center gap-4 text-blush/80">
            <span className="h-px w-10 bg-champagne" />
            Bridal
          </p>
          <Lines className="h-lg" lines={["Every celebration", <em key="l" className="text-blush">has its own look.</em>]} />
        </div>
        <p data-reveal="fade" className="max-w-[34ch] text-cream/70 md:col-span-4 md:justify-self-end">
          From the first dholki to the final Walima — each event gets a look of its own, and a team that knows the day.
        </p>
      </div>

      {/* Desktop accordion */}
      <div data-reveal="fade" className="px-gutter relative hidden h-[78vh] max-h-[760px] min-h-[520px] gap-3 md:flex">
        {looks.map((l, i) => {
          const on = i === active;
          return (
            <a
              key={l.name}
              href="#contact"
              data-cursor="VIEW"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative overflow-hidden transition-[flex-grow] duration-[1100ms] ease-silk"
              style={{ flexGrow: on ? 4.2 : 1, flexBasis: 0 }}
              aria-label={`${l.name} bridal looks`}
            >
              <div className={`absolute inset-0 transition-transform duration-[1600ms] ease-silk ${on ? "scale-100" : "scale-[1.12]"}`}>
                <Img photo={l.photo} sizes="(min-width: 768px) 50vw, 100vw" className="warm" />
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/15 to-transparent transition-opacity duration-700 ${
                  on ? "opacity-100" : "opacity-60"
                }`}
              />
              <div className={`absolute inset-0 bg-mocha-deep/45 transition-opacity duration-700 ${on ? "opacity-0" : "opacity-100"}`} />

              {/* Collapsed label */}
              <span
                className={`eyebrow absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.62rem] text-cream [writing-mode:vertical-rl] rotate-180 transition-opacity duration-500 ${
                  on ? "opacity-0" : "opacity-100 delay-300"
                }`}
              >
                {l.name}
              </span>

              {/* Expanded caption */}
              <div className="absolute inset-x-0 bottom-0 overflow-hidden p-8 lg:p-10">
                <div className={`transition-all duration-[900ms] ease-silk ${on ? "translate-y-0 opacity-100 delay-300" : "translate-y-8 opacity-0"}`}>
                  <p className="eyebrow mb-3 text-[0.6rem] text-champagne">0{i + 1} / 05</p>
                  <h3 className="display text-[clamp(3rem,5vw,4.6rem)] whitespace-nowrap">{l.name}</h3>
                  <p className="mt-2 whitespace-nowrap text-cream/75">{l.note}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Mobile rail */}
      <div className="rail flex gap-3 overflow-x-auto px-[var(--gutter)] scroll-px-[var(--gutter)] md:hidden">
        {looks.map((l, i) => (
          <a key={l.name} href="#contact" className="relative aspect-[3/4.4] w-[78vw] shrink-0 overflow-hidden">
            <Img photo={l.photo} sizes="80vw" className="warm" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="eyebrow mb-2 text-[0.58rem] text-champagne">0{i + 1} / 05</p>
              <h3 className="display text-[3rem]">{l.name}</h3>
              <p className="mt-1 text-sm text-cream/75">{l.note}</p>
            </div>
          </a>
        ))}
      </div>
      <p className="eyebrow px-gutter mt-6 text-[0.56rem] text-cream/50 md:hidden">Swipe to explore →</p>
    </section>
  );
}
