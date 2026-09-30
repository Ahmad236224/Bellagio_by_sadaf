"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Img from "@/components/media/Img";
import Video from "@/components/media/Video";
import Lines from "@/components/ui/Lines";
import { gallery, type GalleryItem } from "@/lib/media";
import { gsap, smooth, reducedMotion } from "@/lib/motion";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative bg-cream py-28 md:py-40">
      <div className="px-gutter mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p data-reveal="fade" className="eyebrow mb-8 flex items-center gap-4 text-mocha">
            <span className="h-px w-10 bg-champagne" />
            Gallery
          </p>
          <Lines className="h-xl text-espresso" lines={["The Bellagio", <em key="e" className="text-mocha">Edit</em>]} />
        </div>
        <p data-reveal="fade" className="eyebrow text-[0.6rem] leading-[2] text-mocha/80">
          Bridal · Makeup · Hair · Skin · Spa
        </p>
      </div>

      {/* Desktop masonry */}
      <div className="px-gutter hidden columns-3 gap-5 md:block lg:columns-4">
        {gallery.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            data-cursor="VIEW"
            className="group mb-5 block w-full break-inside-avoid text-left"
            aria-label={`Open ${item.caption}`}
          >
            <div data-reveal="clip" data-delay={String((i % 4) * 0.08)} className="zoom relative overflow-hidden" style={{ aspectRatio: item.ratio }}>
              <div className="absolute inset-0">
                <Tile item={item} sizes="(min-width: 1024px) 25vw, 33vw" />
              </div>
              <div className="absolute inset-0 bg-espresso/0 transition-colors duration-700 group-hover:bg-espresso/20" />
            </div>
            <p className="eyebrow mt-3 flex justify-between text-[0.56rem] text-mocha/80">
              <span>{item.caption}</span>
              <span className="text-champagne">{String(i + 1).padStart(2, "0")}</span>
            </p>
          </button>
        ))}
      </div>

      {/* Mobile swipe rail */}
      <div className="rail flex gap-3 overflow-x-auto px-[var(--gutter)] scroll-px-[var(--gutter)] md:hidden">
        {gallery.map((item, i) => (
          <button key={i} type="button" onClick={() => setOpen(i)} className="w-[68vw] shrink-0 text-left" aria-label={`Open ${item.caption}`}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Tile item={item} sizes="70vw" />
            </div>
            <p className="eyebrow mt-2 text-[0.54rem] text-mocha/80">{item.caption}</p>
          </button>
        ))}
      </div>
      <p className="eyebrow px-gutter mt-6 text-[0.56rem] text-mocha/60 md:hidden">Swipe · tap to enlarge</p>

      {open !== null && <Lightbox index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Tile({ item, sizes }: { item: GalleryItem; sizes: string }) {
  return item.kind === "video" ? <Video clip={item.clip} className="warm" /> : <Img photo={item.photo} sizes={sizes} className="warm" />;
}

function Lightbox({ index, onChange, onClose }: { index: number; onChange: (i: number) => void; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const n = gallery.length;
  const item = gallery[index];

  const go = useCallback((d: number) => onChange((index + d + n) % n), [index, n, onChange]);

  const close = useCallback(() => {
    if (reducedMotion() || !root.current) return onClose();
    gsap.to(root.current, { opacity: 0, duration: 0.45, ease: "power2.out", onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    smooth.stop();
    root.current?.focus();
    if (!reducedMotion()) gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    return () => smooth.start();
  }, []);

  useEffect(() => {
    if (reducedMotion() || !stage.current) return;
    gsap.fromTo(stage.current, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, close]);

  // Swipe on touch
  const startX = useRef<number | null>(null);

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery viewer"
      tabIndex={-1}
      className="fixed inset-0 z-[160] flex flex-col bg-espresso/96 text-cream outline-none backdrop-blur-sm"
      onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (startX.current === null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        startX.current = null;
      }}
    >
      <div className="px-gutter flex h-20 shrink-0 items-center justify-between">
        <p className="eyebrow text-[0.6rem] text-cream/70">
          <span className="text-champagne">{String(index + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
        </p>
        <button type="button" onClick={close} aria-label="Close" className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-espresso">
          <X size={18} strokeWidth={1.25} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24" onClick={(e) => e.target === e.currentTarget && close()}>
        <div ref={stage} key={index} className="relative h-full max-h-[78vh] w-full max-w-[min(90vw,calc(78vh*0.8))]">
          {item.kind === "video" ? (
            <Video clip={item.clip} eager />
          ) : (
            <Img photo={item.photo} sizes="90vw" quality={85} eager className="!object-contain" />
          )}
        </div>
        <button type="button" onClick={() => go(-1)} aria-label="Previous" className="absolute left-4 hidden h-14 w-14 items-center justify-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-espresso md:flex">
          <ChevronLeft size={20} strokeWidth={1.25} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next" className="absolute right-4 hidden h-14 w-14 items-center justify-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-espresso md:flex">
          <ChevronRight size={20} strokeWidth={1.25} />
        </button>
      </div>

      <p className="px-gutter display flex h-24 shrink-0 items-center justify-center text-center text-[1.6rem] italic text-cream/85">{item.caption}</p>
    </div>
  );
}
