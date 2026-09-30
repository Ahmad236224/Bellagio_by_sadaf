/**
 * ─────────────────────────────────────────────────────────────
 *  BELLAGIO BY SADAF — central media library
 * ─────────────────────────────────────────────────────────────
 *  Every photo and video on the page is referenced from this file.
 *  All current assets are TEMPORARY royalty-free stock:
 *    · photos — Unsplash (free licence, no attribution required)
 *    · videos — Mixkit (free licence)
 *
 *  To swap in Bellagio's own media:
 *    1. Drop files into /public/media (e.g. /public/media/hero.mp4)
 *    2. Replace the matching `src` / `mobile` / `poster` with the local
 *       path ("/media/hero.mp4").
 *  Layouts, crops and animation keep working — nothing else changes.
 * ─────────────────────────────────────────────────────────────
 */

export type Photo = {
  src: string;
  alt: string;
  /** Focal point for object-position, e.g. "50% 30%". */
  focus?: string;
};

export type Clip = {
  /** Desktop source (~720p MP4). */
  src: string;
  /** Lighter mobile source (~360p). */
  mobile?: string;
  /** Poster frame shown before playback and for reduced-motion users. */
  poster: string;
  alt: string;
  focus?: string;
};

const u = (id: string, alt: string, focus?: string): Photo => ({
  src: `https://images.unsplash.com/photo-${id}`,
  alt,
  focus,
});

const mk = (id: number, alt: string, focus?: string): Clip => ({
  src: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  mobile: `https://assets.mixkit.co/videos/${id}/${id}-360.mp4`,
  poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-720-0.jpg`,
  alt,
  focus,
});

/* ═════════════════════════  PHOTOS  ═════════════════════════ */

export const P = {
  // Bridal
  nikkahIvory: u("1617633150875-57ee409d03b4", "Bride in ivory with pearl and gold jewellery, soft studio light", "50% 25%"),
  pearls: u("1742029560234-bd22dc2bfe8b", "Close-up of a pearl necklace resting against warm skin"),
  mehndiYellow: u("1767955694884-d4bf352c23c2", "Bride in an ornate yellow and maroon lehenga, dupatta over her head", "50% 25%"),
  mehndiPalm: u("1623217509141-6f735087b50c", "Bride holding up a hennaed palm", "50% 40%"),
  mehndiHands: u("1732118400647-a81e3b37be87", "Crossed hands with fresh henna over rich brown fabric"),
  baraatNath: u("1594140700783-f9e70c7abc25", "Bride in red with a gold nath and layered kundan necklace", "50% 25%"),
  baraatRegal: u("1617633150878-7df1d12a9a57", "Bride in red and gold with a heavy gold necklace and maang tikka", "50% 25%"),
  baraatVeil: u("1600685890506-593fdf55949b", "Bride in red with jhoomar, maang tikka and gold choker", "50% 25%"),
  baraatClose: u("1684868265714-fd2300637c23", "Close-up of a bride with nath, maang tikka and smoky eyes", "50% 35%"),
  velvet: u("1740674570349-1fad9be37801", "Bride in maroon velvet with silver jewellery", "50% 20%"),
  jewelrySet: u("1600862754152-80a263dd564f", "Gold bridal necklace and earrings on a dark display"),
  walimaArch: u("1746372283841-dbb3838f9935", "Bride in a pastel lehenga standing in a stone archway", "50% 25%"),
  walimaVeil: u("1721324807072-784ab8ddf166", "Bride lifting a blush veil, gold choker, soft light", "50% 30%"),
  walimaSoft: u("1721324807083-e9ddaa99310e", "Bride in blush with the veil drawn back", "50% 25%"),
  walimaBlush: u("1639664341870-f8c9d9a53735", "Bride in a blush sari with a veil", "50% 25%"),
  engageGlam: u("1736849544435-62169987e56c", "Portrait with kundan jewellery and a colourful lehenga", "50% 30%"),
  engagePink: u("1610173827043-9db50e0d8ef9", "Bride in pink with a jhoomar, eyes lowered", "50% 25%"),

  // Makeup
  mkShadow: u("1709477542170-f11ee7d471a0", "Artist applying eyeshadow with a fine brush", "50% 40%"),
  mkArtist: u("1636023730877-233b9237d4ec", "Makeup artist working on a seated client", "50% 40%"),
  mkWing: u("1595550912256-b24059bb08e8", "Profile close-up of a sharp winged liner on warm skin", "40% 50%"),
  mkRedLip: u("1635814442700-446512be496a", "Woman with eyes closed, red lips, warm light", "50% 30%"),
  mkGloss: u("1758605456769-7f3d0939f623", "Macro of lips with a shimmer nude gloss"),
  mkEye: u("1790575169579-7f70803e34f5", "Close-up of a brown eye with soft lashes"),
  mkPalette: u("1596704017254-9b121068fb31", "Hand holding a pencil beside an open eyeshadow palette"),
  mkFlatlay: u("1596462502278-27bfdc403348", "Rose-gold brushes, lipstick and bronzer on beige"),

  // Hair
  hrCurl: u("1560869713-7d0a29430803", "Stylist curling long brown hair", "50% 30%"),
  hrTwist: u("1614020863825-28a0bb7e3c3c", "Close-up of waves with a knotted half-up twist"),
  hrFlip: u("1619218533116-f050e7d91d91", "Woman flipping long dark hair in motion", "50% 30%"),
  hrBridal: u("1549236177-77e8271c34b6", "Long bridal waves with a crystal hair vine", "50% 30%"),

  // Skin, spa & nails
  skSerum: u("1670201203208-055d6d79db4a", "Hand pressing serum into the cheek"),
  skFacial: u("1643684391140-c5056cfd3436", "Client receiving a facial massage in warm light", "50% 40%"),
  skMist: u("1599847987657-881f11b92a75", "Woman in a white robe misting her face at a round mirror", "50% 30%"),
  spHoney: u("1706795033849-7ca391f007c5", "Rolled towels, honey and a lit candle on a spa table"),
  nlManicurist: u("1632345031435-8727f6897d53", "Manicurist working on a client's nails"),
  nlNude: u("1610992015762-45dca7fa3a85", "Hand with a nude manicure resting on soft fur"),
  nlRing: u("1641814250010-9887d86eedfd", "Manicured hands with a fine ring on beige fur"),
  nlSwatch: u("1696342003838-4a8f9f36588c", "Nude and shimmer nail swatches with dried flowers"),

  // Salon
  inLounge: u("1773904215697-e6c21fc27ac2", "Tufted chairs and warm pendant lights in a dim salon"),
  inNiche: u("1770925758916-44e22e159542", "Illuminated round niche lined with beauty products"),
  inArches: u("1781450090585-1a511b7066d9", "Salon interior with arched mirrors and soft light"),
} satisfies Record<string, Photo>;

/* ═════════════════════════  VIDEOS  ═════════════════════════ */

export const V = {
  artistBase: mk(52046, "A makeup artist smoothing base onto a client's skin in warm blush light", "45% 40%"),
  mirrorCheck: mk(52039, "A woman checking her finished makeup in a softly lit mirror"),
  reflection: mk(52054, "A woman studying her reflection in warm light"),
  finale: mk(52042, "A woman admiring her finished makeup in soft blush light", "50% 35%"),
  blush: mk(52057, "A brush sweeping colour across the cheekbone"),
  lipstick: mk(50622, "A makeup artist making the final lipstick touches"),
  blowdry: mk(45893, "Long hair being blow-dried, close-up"),
  hairPlay: mk(16189, "A woman running her fingers through long dark hair", "50% 30%"),
  bridePrep: mk(40559, "A bride getting ready, flowers set into her hair"),
} satisfies Record<string, Clip>;

/* ═══════════════  GALLERY — The Bellagio Edit  ═══════════════ */

export type GalleryItem =
  | { kind: "photo"; photo: Photo; caption: string; ratio: string }
  | { kind: "video"; clip: Clip; caption: string; ratio: string };

const g = (photo: Photo, caption: string, ratio: string): GalleryItem => ({ kind: "photo", photo, caption, ratio });
const gv = (clip: Clip, caption: string, ratio: string): GalleryItem => ({ kind: "video", clip, caption, ratio });

export const gallery: GalleryItem[] = [
  g(P.baraatClose, "Baraat · Nath and kohl", "4/5"),
  gv(V.blush, "Soft glam, in motion", "4/5"),
  g(P.hrBridal, "Bridal waves", "3/4"),
  g(P.skSerum, "Skin prep", "1/1"),
  g(P.walimaArch, "Walima · Pastel and pearl", "2/3"),
  g(P.mkGloss, "Nude gloss", "1/1"),
  gv(V.bridePrep, "Getting ready", "3/4"),
  g(P.nlRing, "A quiet manicure", "4/5"),
  g(P.velvet, "Velvet and silver", "3/4"),
  g(P.spHoney, "The spa ritual", "1/1"),
  g(P.mkRedLip, "Evening red", "4/5"),
  g(P.inArches, "Arched mirrors", "3/4"),
];

/* ═══════════════  SOCIAL STRIP  ═══════════════ */

export const social: Photo[] = [
  P.engageGlam,
  P.hrTwist,
  P.inNiche,
  P.mehndiHands,
  P.nlSwatch,
  P.walimaBlush,
  P.jewelrySet,
  P.nlNude,
];
