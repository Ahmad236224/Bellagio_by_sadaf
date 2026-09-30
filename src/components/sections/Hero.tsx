"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Video from "@/components/media/Video";
import Lines from "@/components/ui/Lines";
import Logo from "@/components/layout/Logo";
import { V } from "@/lib/media";
import { gsap, reducedMotion, isMobile } from "@/lib/motion";

/**
 * Opening sequence (~1.5s): cream curtain → wordmark → champagne hairline →
 * hero video unveils through a soft mask → headline rises line by line →
 * copy and buttons float up.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-intro-logo]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo("[data-intro-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, 0.15)
        .to(intro.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85, ease: "expo.inOut" }, 0.62)
        .fromTo(
          q("[data-hero-media]"),
          { clipPath: "inset(14% 18% 14% 18% round 2px)", scale: 1.22 },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, duration: 1.35, ease: "expo.inOut" },
          0.58
        )
        .to(q('[data-hero="line"] > span'), { y: 0, yPercent: 0, duration: 1.1, stagger: 0.1, ease: "power4.out" }, 1.0)
        .to(q('[data-hero="fade"]'), { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 1.2)
        .to(document.querySelectorAll('[data-hero="nav"]'), { opacity: 1, y: 0, duration: 0.9 }, 1.25)
        .set(intro.current, { display: "none" });

      // Gentle drift as the hero scrolls away (desktop only).
      if (!isMobile()) {
        gsap.to(q("[data-hero-inner]"), {
          yPercent: 12,
          scale: 1.06,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q("[data-hero-copy]"), {
          y: -80,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="home" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-espresso text-cream">
      {/* Media */}
      <div data-hero-media className="absolute inset-0 will-change-[clip-path,transform]">
        <div data-hero-inner className="absolute inset-0 grain">
          <Video clip={V.artistBase} eager className="warm" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-espresso/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/55 via-transparent to-transparent" />
      </div>

      {/* Copy */}
      <div data-hero-copy className="px-gutter relative flex h-full flex-col justify-end pb-[max(6.5rem,14svh)] md:pb-24">
        <p data-hero="fade" className="eyebrow mb-7 flex items-center gap-4 text-cream/85">
          <span className="h-px w-10 bg-champagne" />
          Bellagio by Sadaf · Karachi
        </p>
        <Lines
          as="h1"
          hero
          className="h-xl max-w-[12ch] text-[clamp(3.4rem,14vw,8.5rem)] md:text-[clamp(4rem,8.6vw,8.5rem)]"
          lines={[
            "Beauty,",
            <>
              <em className="text-blush">beautifully</em> considered.
            </>,
          ]}
        />
        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p data-hero="fade" className="max-w-[34ch] text-[1.02rem] leading-relaxed text-cream/85">
            Luxury bridal, makeup, hair and salon experiences designed with intention.
          </p>
          <div data-hero="fade" className="flex flex-col gap-3 sm:flex-row">
            <a href="#about" className="btn btn-solid">
              Discover Bellagio
            </a>
            <a href="#contact" data-cursor="BOOK" className="btn btn-ghost">
              Book appointment <ArrowRight size={15} strokeWidth={1.25} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        data-hero="fade"
        className="absolute bottom-8 right-[var(--gutter)] hidden items-center gap-4 text-cream/70 md:flex"
        aria-label="Scroll to discover"
      >
        <span className="eyebrow text-[0.58rem] [writing-mode:vertical-rl]">Scroll to discover</span>
        <span className="relative h-16 w-px overflow-hidden bg-cream/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.4s_var(--ease-curtain)_infinite] bg-champagne" />
        </span>
      </a>

      {/* Intro curtain */}
      <div
        ref={intro}
        className="intro fixed inset-0 z-[150] flex flex-col items-center justify-center bg-cream text-espresso"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        aria-hidden
      >
        <div data-intro-logo className="opacity-0">
          <Logo className="[&>span:first-child]:text-[clamp(3.2rem,9vw,5.5rem)]" />
        </div>
        <span data-intro-line className="mt-6 block h-px w-40 origin-left scale-x-0 bg-champagne" />
      </div>
    </section>
  );
}
