# Bellagio by Sadaf — luxury one-page demo

A single-page concept/redesign demo for **Bellagio by Sadaf** (Karachi): bridal, makeup, hair and salon.

Built with Next.js 16, TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger, Lenis and Lucide.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Where things live

- `src/app/page.tsx` — the section order
- `src/components/sections/` — one file per section (Hero, BrandIntro, Signatures, BridalShowcase, …)
- `src/components/motion/Motion.tsx` — scroll reveals driven by `data-reveal` / `data-parallax` attributes
- `src/lib/media.ts` — **every photo and video**. All are temporary royalty-free stock (Unsplash photos, Mixkit videos). To use Bellagio's own media, drop files in `public/media/` and swap the paths there.
- `src/lib/site.ts` — business details. **WhatsApp number, Instagram and Facebook are blank** until the salon confirms them; buttons fall back to generic WhatsApp/Instagram links meanwhile.

Testimonials are generic placeholders, with no real client names.
