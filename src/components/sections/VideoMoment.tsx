import Video from "@/components/media/Video";
import Lines from "@/components/ui/Lines";
import { V } from "@/lib/media";

/** One immersive, uncluttered full-bleed film moment. */
export default function VideoMoment() {
  return (
    <section className="relative h-[92svh] min-h-[560px] overflow-hidden bg-espresso text-cream md:h-[110vh]" data-cursor="PLAY">
      <div data-parallax="0.18" className="absolute -inset-y-[10%] inset-x-0 grain">
        <Video clip={V.mirrorCheck} className="warm" toggle />
      </div>
      <div className="absolute inset-0 bg-espresso/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-transparent to-espresso/50" />
      <div className="px-gutter relative flex h-full flex-col items-center justify-center text-center">
        <span data-reveal="fade" className="mb-10 block h-14 w-px bg-champagne" />
        <Lines className="h-lg max-w-[14ch]" lines={["Made for the moments", <em key="m" className="text-blush">you’ll keep forever.</em>]} />
      </div>
    </section>
  );
}
