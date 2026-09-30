/**
 * Business details. Only what Bellagio has confirmed goes here — the
 * WhatsApp number and social handles are intentionally blank until the
 * salon provides them. Links fall back gracefully while they are empty.
 */
export const site = {
  name: "Bellagio",
  byline: "By Sadaf",
  city: "Karachi",
  /** International format, digits only, e.g. "923001234567". */
  whatsapp: "",
  instagram: "",
  facebook: "",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Bridal", href: "#bridal" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function whatsappLink(message = "Hello Bellagio, I'd like to book an appointment.") {
  const text = encodeURIComponent(message);
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}

export const socialLink = {
  instagram: () => site.instagram || "https://www.instagram.com/",
  facebook: () => site.facebook || "https://www.facebook.com/",
};
