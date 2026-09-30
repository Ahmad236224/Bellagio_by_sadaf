import { ArrowUpRight } from "lucide-react";
import Img from "@/components/media/Img";
import Video from "@/components/media/Video";
import Lines from "@/components/ui/Lines";
import { P, V, type Clip, type Photo } from "@/lib/media";

type Block = {
  no: string;
  tag: string;
  title: string;
  copy?: string;
  list?: string[];
  cta: { label: string; href: string };
  photo?: Photo;
  clip?: Clip;
  detail?: Photo;
};

const blocks: Block[] = [
  {
    no: "01",
    tag: "Bridal",
    title: "The Bellagio Bride",
    copy: "Bespoke bridal artistry for Nikkah, Mehndi, Baraat, Walima and engagement.",
    cta: { label: "Explore bridal", href: "#bridal" },
    photo: P.baraatVeil,
    detail: P.mehndiPalm,
  },
  {
    no: "02",
    tag: "Makeup",
    title: "Signature Makeup",
    list: ["Soft Glam", "Full Glam", "Party Makeup", "Engagement", "Event Makeup"],
    cta: { label: "Book makeup", href: "#contact" },
    clip: V.lipstick,
    detail: P.mkEye,
  },
  {
    no: "03",
    tag: "Hair & Beauty",
    title: "Hair & Beauty",
    list: ["Blow Dry", "Waves", "Updos", "Hair Color", "Skin Prep", "Facials", "Nails"],
    cta: { label: "Book hair & beauty", href: "#contact" },
    clip: V.blowdry,
    detail: P.hrFlip,
  },
];

export default function Signatures() {
  return (
    <section id="services" className="relative bg-blush pb-28 pt-28 md:pb-44 md:pt-40">
      <div className="px-gutter mb-20 flex flex-col gap-6 md:mb-32 md:flex-row md:items-end md:justify-between">
        <Lines className="h-xl text-espresso" lines={[<>Our <em key="s" className="text-mocha">signatures.</em></>]} />
        <p data-reveal="fade" className="eyebrow max-w-[30ch] text-[0.62rem] leading-[2.1] text-mocha">
          Three ateliers under one roof — each led by specialists.
        </p>
      </div>

      <div className="flex flex-col gap-28 md:gap-44">
        {blocks.map((b, i) => (
          <SignatureBlock key={b.no} block={b} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function SignatureBlock({ block: b, flip }: { block: Block; flip: boolean }) {
  return (
    <article className="px-gutter grid items-center gap-y-12 md:grid-cols-12 md:gap-x-8">
      {/* Media */}
      <div className={`relative md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
        <div
          data-reveal="clip"
          data-cursor={b.clip ? "PLAY" : "VIEW"}
          className="zoom relative aspect-[4/5] overflow-hidden md:aspect-[6/7]"
        >
          <div data-parallax="0.1" className="absolute -inset-y-[6%] inset-x-0">
            {b.clip ? <Video clip={b.clip} className="warm" toggle /> : b.photo && <Img photo={b.photo} sizes="(min-width: 768px) 58vw, 100vw" className="warm" />}
          </div>
        </div>
        <span className={`display pointer-events-none absolute -top-10 text-[6rem] leading-none text-cream/80 md:-top-16 md:text-[11rem] ${flip ? "right-2 md:-right-6" : "left-2 md:-left-6"}`}>
          {b.no}
        </span>
        {b.detail && (
          <div
            data-parallax="0.3"
            className={`absolute -bottom-12 hidden w-[34%] md:block ${flip ? "-left-16" : "-right-20"}`}
          >
            <div data-reveal="clip" data-delay="0.25" className="relative aspect-[3/4] overflow-hidden border-[10px] border-blush">
              <Img photo={b.detail} sizes="20vw" className="warm" />
            </div>
          </div>
        )}
      </div>

      {/* Copy */}
      <div className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
        <p data-reveal="fade" className="eyebrow mb-6 flex items-center gap-4 text-mocha">
          <span className="text-champagne">{b.no}</span>
          <span className="h-px w-8 bg-mocha/30" />
          {b.tag}
        </p>
        <Lines as="h3" className="h-md text-espresso" lines={[b.title]} />
        {b.copy && (
          <p data-reveal="fade" data-delay="0.1" className="mt-6 max-w-[34ch] text-[1.05rem] text-espresso/75">
            {b.copy}
          </p>
        )}
        {b.list && (
          <ul data-reveal="fade" data-delay="0.1" className="mt-8 border-t border-mocha/20">
            {b.list.map((item) => (
              <li
                key={item}
                className="group flex items-center justify-between border-b border-mocha/20 py-3.5 font-serif text-[1.45rem] text-espresso transition-[padding] duration-500 ease-silk hover:pl-2"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-champagne opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </li>
            ))}
          </ul>
        )}
        <a data-reveal="fade" data-delay="0.2" href={b.cta.href} className="link-line eyebrow mt-10 text-espresso">
          {b.cta.label} <ArrowUpRight size={14} strokeWidth={1.25} />
        </a>
      </div>
    </article>
  );
}
