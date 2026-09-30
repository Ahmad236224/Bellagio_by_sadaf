"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Temporary, generic testimonials for the demo — no real client names.
const quotes = [
  { q: "Everything felt polished from start to finish.", who: "Bridal client · Karachi" },
  { q: "The look felt glamorous without feeling too much.", who: "Makeup client · Karachi" },
  { q: "Calm, unhurried and exactly how I imagined it.", who: "Walima client · Karachi" },
];

/** One large quote at a time, softly crossfading. */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % quotes.length), 6500);
    return () => clearTimeout(t);
  }, [i, paused]);

  const go = (d: number) => setI((n) => (n + d + quotes.length) % quotes.length);

  return (
    <section
      className="relative overflow-hidden bg-cream py-32 md:py-48"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client words"
    >
      <span className="display pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-[18rem] leading-none text-blush/70 md:top-0 md:text-[28rem]">
        “
      </span>
      <div className="px-gutter relative mx-auto max-w-6xl text-center">
        <p data-reveal="fade" className="eyebrow mb-12 text-mocha">Kind words</p>
        <div data-reveal="fade" className="relative grid">
          {quotes.map((t, n) => (
            <blockquote
              key={t.q}
              className={`col-start-1 row-start-1 transition-all duration-[1100ms] ease-silk ${
                n === i ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-6 opacity-0 blur-[2px]"
              }`}
              aria-hidden={n !== i}
            >
              <p className="display text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.05] text-espresso">“{t.q}”</p>
              <footer className="eyebrow mt-10 text-[0.62rem] text-mocha">{t.who}</footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-14 flex items-center justify-center gap-6">
          <button type="button" onClick={() => go(-1)} aria-label="Previous quote" className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/20 transition-colors duration-500 hover:bg-espresso hover:text-cream">
            <ArrowLeft size={16} strokeWidth={1.25} />
          </button>
          <div className="flex gap-2">
            {quotes.map((_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Quote ${n + 1}`}
                className={`h-px transition-all duration-700 ease-silk ${n === i ? "w-12 bg-champagne" : "w-6 bg-espresso/25"}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next quote" className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/20 transition-colors duration-500 hover:bg-espresso hover:text-cream">
            <ArrowRight size={16} strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </section>
  );
}
