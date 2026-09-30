import { ArrowRight } from "lucide-react";
import Video from "@/components/media/Video";
import Lines from "@/components/ui/Lines";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { V } from "@/lib/media";
import { whatsappLink } from "@/lib/site";

export default function FinalCta() {
  return (
    <section id="contact" className="relative flex min-h-[100svh] items-center overflow-hidden bg-espresso text-cream">
      <div data-parallax="0.16" className="absolute -inset-y-[10%] inset-x-0 grain">
        <Video clip={V.finale} className="warm" />
      </div>
      <div className="absolute inset-0 bg-espresso/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-espresso/40" />

      <div className="px-gutter relative w-full py-32 text-center">
        <p data-reveal="fade" className="eyebrow mb-10 text-blush/85">Bellagio by Sadaf · Karachi</p>
        <Lines className="h-xl mx-auto max-w-[13ch]" lines={["Your Bellagio", <em key="c" className="text-blush">moment starts here.</em>]} />
        <p data-reveal="fade" className="mx-auto mt-8 max-w-[38ch] text-cream/75">
          Tell us about your occasion and we&rsquo;ll shape the appointment around you.
        </p>
        <div data-reveal="fade" data-delay="0.1" className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={whatsappLink()} target="_blank" rel="noopener" data-cursor="BOOK" className="btn btn-solid w-full sm:w-auto">
            Book appointment <ArrowRight size={15} strokeWidth={1.25} />
          </a>
          <a
            href={whatsappLink("Hello Bellagio, I have a question.")}
            target="_blank"
            rel="noopener"
            data-cursor="BOOK"
            className="btn btn-ghost w-full sm:w-auto"
          >
            <WhatsAppIcon size={16} /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
