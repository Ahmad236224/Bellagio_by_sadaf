"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { nav, whatsappLink, socialLink } from "@/lib/site";
import { gsap, smooth, reducedMotion } from "@/lib/motion";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full-screen mobile menu: curtain drops, links rise in sequence.
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    if (open) smooth.stop();
    else smooth.start();
    if (reducedMotion()) {
      el.style.visibility = open ? "visible" : "hidden";
      return;
    }
    if (open) {
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll("[data-menu-item]"), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.06, delay: 0.35, ease: "power4.out" });
      gsap.fromTo(el.querySelectorAll("[data-menu-fade]"), { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.7 });
    } else {
      gsap.to(el, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => gsap.set(el, { visibility: "hidden" }),
      });
    }
  }, [open]);

  const dark = solid || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,color,box-shadow,height] duration-700 ease-silk ${
          solid && !open ? "bg-cream/92 text-espresso shadow-[0_1px_0_rgba(36,26,23,0.08)] backdrop-blur-md" : ""
        } ${open ? "text-cream" : solid ? "" : "text-cream"}`}
      >
        <div data-hero="nav" className={`px-gutter flex items-center justify-between transition-[height] duration-700 ease-silk ${solid ? "h-[4.5rem]" : "h-[5.5rem]"}`}>
          <a href="#home" aria-label="Bellagio by Sadaf — home" className="relative z-10" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block" aria-label="Main">
            <ul className="flex items-center gap-9">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-line eyebrow text-[0.64rem]">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp Bellagio"
              className={`hidden h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 hover:bg-champagne hover:text-espresso sm:flex ${
                dark && !open ? "border-espresso/20" : "border-cream/35"
              }`}
            >
              <WhatsAppIcon />
            </a>
            <a
              href="#contact"
              data-cursor="BOOK"
              className={`btn hidden h-11 sm:inline-flex ${solid && !open ? "btn-dark" : "btn-ghost"}`}
            >
              Book now
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="relative z-10 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        className="invisible fixed inset-0 z-[90] flex flex-col bg-espresso px-gutter pb-10 pt-32 text-cream lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        aria-hidden={!open}
      >
        <ul className="flex flex-1 flex-col justify-center gap-1">
          {nav.map((n, i) => (
            <li key={n.href} className="overflow-hidden">
              <a
                href={n.href}
                data-menu-item
                onClick={() => setOpen(false)}
                className="display flex items-baseline gap-4 py-1 text-[3.1rem]"
                tabIndex={open ? 0 : -1}
              >
                <span className="eyebrow text-[0.6rem] text-champagne">0{i + 1}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div data-menu-fade className="flex flex-col gap-6 border-t border-cream/15 pt-8">
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-solid w-full" tabIndex={open ? 0 : -1}>
            Book appointment <ArrowRight size={16} strokeWidth={1.25} />
          </a>
          <div className="eyebrow flex items-center justify-between text-[0.6rem] text-cream/70">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="flex items-center gap-2" tabIndex={open ? 0 : -1}>
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
            <a href={socialLink.instagram()} target="_blank" rel="noopener" className="flex items-center gap-2" tabIndex={open ? 0 : -1}>
              <InstagramIcon size={16} /> Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
