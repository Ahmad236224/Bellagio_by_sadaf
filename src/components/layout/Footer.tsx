import Logo from "./Logo";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { site, whatsappLink, socialLink } from "@/lib/site";

const services = [
  { label: "Bridal", href: "#bridal" },
  { label: "Makeup", href: "#services" },
  { label: "Hair", href: "#services" },
  { label: "Skin", href: "#services" },
  { label: "Spa", href: "#services" },
];
const explore = [
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const connect = [
    { label: "Instagram", href: socialLink.instagram(), icon: InstagramIcon },
    { label: "Facebook", href: socialLink.facebook(), icon: FacebookIcon },
    { label: "WhatsApp", href: whatsappLink(), icon: WhatsAppIcon },
  ];

  return (
    <footer className="relative overflow-hidden bg-espresso pb-28 pt-24 text-cream md:pb-10 md:pt-32">
      <div className="px-gutter">
        <div className="grid gap-12 border-b border-cream/10 pb-16 sm:grid-cols-3 md:grid-cols-12">
          <div className="sm:col-span-3 md:col-span-6">
            <p className="display max-w-[18ch] text-[2.2rem] leading-tight text-cream/90">
              Luxury bridal, makeup, hair &amp; salon — <em className="text-blush">{site.city}.</em>
            </p>
          </div>
          <FooterCol title="Services" items={services} className="md:col-span-2" />
          <FooterCol title="Explore" items={explore} className="md:col-span-2" />
          <div className="md:col-span-2">
            <p className="eyebrow mb-6 text-[0.58rem] text-champagne">Connect</p>
            <ul className="space-y-3">
              {connect.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener" className="link-line text-cream/75 transition-colors hover:text-cream">
                    <Icon size={15} /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center py-14 md:py-20">
          <Logo size="lg" />
        </div>

        <div className="eyebrow flex flex-col gap-3 text-[0.55rem] text-cream/45 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Bellagio by Sadaf</span>
          <span>Concept demo · imagery is temporary</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, className = "" }: { title: string; items: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-6 text-[0.58rem] text-champagne">{title}</p>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} className="link-line text-cream/75 transition-colors hover:text-cream">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
