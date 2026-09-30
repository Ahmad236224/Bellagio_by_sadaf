import { ArrowUpRight } from "lucide-react";
import Img from "@/components/media/Img";
import Lines from "@/components/ui/Lines";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { social } from "@/lib/media";
import { socialLink } from "@/lib/site";

/** Instagram-inspired strip — a slow drifting row, no live integration. */
export default function Social() {
  const row = [...social, ...social];
  return (
    <section className="relative overflow-hidden bg-blush py-28 md:py-36">
      <div className="px-gutter mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p data-reveal="fade" className="eyebrow mb-8 flex items-center gap-3 text-mocha">
            <InstagramIcon size={15} className="text-champagne" />
            On Instagram
          </p>
          <Lines className="h-lg text-espresso" lines={[<>Inside <em key="i" className="text-mocha">Bellagio.</em></>]} />
        </div>
        <a data-reveal="fade" href={socialLink.instagram()} target="_blank" rel="noopener" className="btn btn-dark self-start md:self-auto">
          Follow Bellagio by Sadaf <ArrowUpRight size={15} strokeWidth={1.25} />
        </a>
      </div>

      <div className="flex w-max gap-3 drift md:gap-4">
        {row.map((p, i) => (
          <a
            key={i}
            href={socialLink.instagram()}
            target="_blank"
            rel="noopener"
            data-cursor="VIEW"
            aria-hidden={i >= social.length}
            tabIndex={i >= social.length ? -1 : 0}
            className="zoom group relative aspect-square w-[44vw] shrink-0 overflow-hidden sm:w-[30vw] md:w-[19vw] lg:w-[15vw]"
          >
            <Img photo={p} sizes="(min-width: 1024px) 15vw, (min-width: 768px) 19vw, 44vw" quality={60} className="warm" />
            <span className="absolute inset-0 flex items-center justify-center bg-mocha/0 text-cream opacity-0 transition-all duration-700 group-hover:bg-mocha/35 group-hover:opacity-100">
              <InstagramIcon size={22} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
