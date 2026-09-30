"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/lib/site";

/** Mobile-only sticky Book + WhatsApp bar, shown once the hero has scrolled away. */
export default function StickyActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.7;
      const atCta = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setShow(pastHero && !atCta);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[80] flex gap-2 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-700 ease-silk md:hidden ${
        show ? "translate-y-0" : "translate-y-[120%]"
      }`}
    >
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp Bellagio"
        className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center bg-cream text-espresso shadow-[0_8px_30px_rgba(36,26,23,0.18)]"
      >
        <WhatsAppIcon size={20} />
      </a>
      <a href="#contact" className="btn btn-dark flex-1 shadow-[0_8px_30px_rgba(36,26,23,0.25)]">
        Book now
      </a>
    </div>
  );
}
