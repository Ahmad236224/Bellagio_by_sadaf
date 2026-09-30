import Img from "@/components/media/Img";
import Video from "@/components/media/Video";
import Lines from "@/components/ui/Lines";
import { P, V } from "@/lib/media";

export default function BrandIntro() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-28 md:py-44">
      <div className="px-gutter grid gap-y-16 md:grid-cols-12 md:gap-x-8">
        {/* Copy + arch video */}
        <div className="md:col-span-5 md:pt-10">
          <p data-reveal="fade" className="eyebrow mb-8 flex items-center gap-4 text-mocha">
            <span className="h-px w-10 bg-champagne" />
            The Bellagio Experience
          </p>
          <Lines className="h-lg text-espresso" lines={["Soft luxury.", <em key="a" className="text-mocha">Personal artistry.</em>]} />
          <p data-reveal="fade" data-delay="0.15" className="mt-9 max-w-[38ch] text-[1.05rem] text-espresso/75">
            Every appointment begins with you — your features, your occasion, your comfort. We shape the look around
            you, never the other way around.
          </p>
          <a data-reveal="fade" data-delay="0.25" href="#services" className="link-line eyebrow mt-10 text-espresso">
            Our signatures
          </a>

          <div className="mt-16 hidden items-end gap-6 md:flex">
            <div data-reveal="clip" className="relative aspect-[3/4] w-52 overflow-hidden rounded-t-full" data-cursor="PLAY">
              <Video clip={V.reflection} className="warm" toggle />
            </div>
            <p className="eyebrow max-w-[16ch] pb-2 text-[0.6rem] leading-[2] text-mocha/80">Bridal · Makeup · Hair · Skin · Spa</p>
          </div>
        </div>

        {/* Portrait with overlapping detail */}
        <div className="relative md:col-span-6 md:col-start-7">
          <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden">
            <div data-parallax="0.12" className="absolute -inset-y-[8%] inset-x-0">
              <Img photo={P.walimaVeil} sizes="(min-width: 768px) 50vw, 100vw" className="warm" />
            </div>
          </div>
          <div
            data-parallax="0.35"
            className="absolute -bottom-10 -left-4 w-[46%] md:-bottom-16 md:-left-28 md:w-[42%]"
          >
            <div data-reveal="clip" data-delay="0.3" className="relative aspect-square overflow-hidden border-[6px] border-cream md:border-[10px]">
              <Img photo={P.pearls} sizes="(min-width: 768px) 22vw, 46vw" />
            </div>
          </div>
          <span className="eyebrow absolute -right-1 top-6 hidden text-[0.58rem] text-mocha/70 [writing-mode:vertical-rl] md:block">
            Bellagio by Sadaf · Karachi
          </span>
        </div>

        {/* Mobile arch video */}
        <div className="flex items-end justify-end gap-5 pt-10 md:hidden">
          <p className="eyebrow max-w-[14ch] pb-2 text-right text-[0.58rem] leading-[2] text-mocha/80">Bridal · Makeup · Hair · Skin · Spa</p>
          <div data-reveal="clip" className="relative aspect-[3/4] w-40 overflow-hidden rounded-t-full">
            <Video clip={V.reflection} className="warm" />
          </div>
        </div>
      </div>
    </section>
  );
}
