import Img from "@/components/media/Img";
import Lines from "@/components/ui/Lines";
import { P, type Photo } from "@/lib/media";

type Tile = { photo: Photo; label: string; className: string; parallax: string; sizes: string };

// Overlapping collage on desktop: each tile is absolutely placed and drifts at its own depth.
const tiles: Tile[] = [
  { photo: P.inLounge, label: "The salon", className: "left-0 top-0 w-[46%] aspect-[4/5] z-10", parallax: "0.06", sizes: "40vw" },
  { photo: P.skFacial, label: "Skin & spa", className: "right-[6%] top-[6%] w-[34%] aspect-[3/4] z-20", parallax: "0.22", sizes: "30vw" },
  { photo: P.mkArtist, label: "The makeup station", className: "left-[38%] top-[44%] w-[30%] aspect-[4/5] z-30", parallax: "0.34", sizes: "28vw" },
  { photo: P.mkFlatlay, label: "Our products", className: "right-0 top-[64%] w-[26%] aspect-square z-20", parallax: "0.16", sizes: "24vw" },
  { photo: P.nlManicurist, label: "Manicure & pedicure", className: "left-[6%] top-[72%] w-[26%] aspect-[5/4] z-20", parallax: "0.26", sizes: "24vw" },
];

export default function InsideBellagio() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-blush/60 py-28 md:py-40">
      <div className="px-gutter mb-16 flex flex-col gap-8 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p data-reveal="fade" className="eyebrow mb-8 flex items-center gap-4 text-mocha">
            <span className="h-px w-10 bg-champagne" />
            The salon & spa
          </p>
          <Lines className="h-xl text-espresso" lines={["Inside", <em key="b" className="text-mocha">Bellagio</em>]} />
        </div>
        <p data-reveal="fade" className="max-w-[34ch] text-espresso/70">
          Warm light, unhurried rooms and a team that works quietly around you — a space made for getting ready.
        </p>
      </div>

      {/* Desktop collage */}
      <div className="px-gutter relative hidden md:block">
        <div className="relative h-[clamp(900px,108vw,1400px)]">
          {tiles.map((t, i) => (
            <figure key={t.label} data-parallax={t.parallax} className={`absolute ${t.className}`}>
              <div data-reveal="clip" data-delay={String(i * 0.08)} data-cursor="VIEW" className="zoom relative h-full w-full overflow-hidden shadow-[0_30px_60px_-30px_rgba(36,26,23,0.35)]">
                <div className="absolute inset-0">
                  <Img photo={t.photo} sizes={t.sizes} className="warm" />
                </div>
              </div>
              <figcaption className="eyebrow mt-3 text-[0.56rem] text-mocha/80">
                <span className="text-champagne">0{i + 1}</span> — {t.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Mobile: stacked, offset pairs */}
      <div className="px-gutter grid grid-cols-6 gap-3 md:hidden">
        {tiles.map((t, i) => (
          <figure
            key={t.label}
            className={
              i === 0
                ? "col-span-6"
                : i % 2 === 1
                  ? "col-span-4 col-start-1"
                  : "col-span-4 col-start-3 -mt-16"
            }
          >
            <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden">
              <Img photo={t.photo} sizes="70vw" className="warm" />
            </div>
            <figcaption className="eyebrow mt-2 text-[0.54rem] text-mocha/80">
              <span className="text-champagne">0{i + 1}</span> — {t.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
