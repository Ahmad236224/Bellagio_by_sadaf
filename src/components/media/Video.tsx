"use client";

import { useEffect, useRef, useState } from "react";
import type { Clip } from "@/lib/media";

type Props = {
  clip: Clip;
  className?: string;
  /** Load immediately (hero only). Everything else lazy-loads near the viewport. */
  eager?: boolean;
  /** Tap/click toggles playback (used with the PLAY cursor). */
  toggle?: boolean;
};

/**
 * Silent, looping, inline background video.
 * · poster first, lighter 360p source on phones
 * · src assigned lazily via IntersectionObserver — nothing offscreen preloads
 * · pauses whenever offscreen
 * · reduced-motion / data-saver users get the poster only
 */
export default function Video({ clip, className = "", eager = false, toggle = false }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [posterOnly, setPosterOnly] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on browser-only preferences
      setPosterOnly(true);
      return;
    }
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const chosen = mobile && clip.mobile ? clip.mobile : clip.src;
    if (eager) setSrc(chosen);
    const el = wrap.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = ref.current;
        if (e.isIntersecting) {
          setSrc((cur) => cur ?? chosen);
          if (v && !userPaused.current) v.play().catch(() => {});
        } else v?.pause();
      },
      { rootMargin: eager ? "0px" : "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [clip, eager]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.muted = true;
    v.load();
    v.play().catch(() => {});
  }, [src]);

  const onClick = toggle
    ? () => {
        const v = ref.current;
        if (!v) return;
        if (v.paused) {
          userPaused.current = false;
          v.play().catch(() => {});
        } else {
          userPaused.current = true;
          v.pause();
        }
      }
    : undefined;

  return (
    <div ref={wrap} className={`absolute inset-0 overflow-hidden ${className}`} onClick={onClick} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={clip.poster}
        alt=""
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: clip.focus }}
      />
      {!posterOnly && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          autoPlay={eager}
          preload={eager ? "auto" : "none"}
          poster={clip.poster}
          onLoadedData={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: clip.focus }}
        >
          {src && <source src={src} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
