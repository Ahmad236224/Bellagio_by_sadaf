"use client";

import Image, { type ImageLoaderProps } from "next/image";
import type { Photo } from "@/lib/media";

/** Unsplash resizes on its own CDN and serves AVIF/WebP via auto=format. */
function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  return `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 72}`;
}

type Props = {
  photo: Photo;
  sizes?: string;
  className?: string;
  eager?: boolean;
  quality?: 60 | 75 | 85;
};

/** Fills its (relatively-positioned) parent with object-cover. */
export default function Img({ photo, sizes = "100vw", className = "", eager, quality = 75 }: Props) {
  const remote = photo.src.includes("images.unsplash.com");
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      quality={quality}
      loader={remote ? unsplashLoader : undefined}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={`object-cover ${className}`}
      style={{ objectPosition: photo.focus }}
    />
  );
}
