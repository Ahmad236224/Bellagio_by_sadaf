type Props = { className?: string; size?: "sm" | "lg" };

/** Bellagio wordmark with the small "By Sadaf" byline. */
export default function Logo({ className = "", size = "sm" }: Props) {
  const lg = size === "lg";
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className={`display ${lg ? "text-[clamp(4.5rem,17vw,15rem)]" : "text-[1.9rem]"} tracking-[-0.01em]`}>Bellagio</span>
      <span className={`eyebrow ${lg ? "mt-3 text-[0.8rem] tracking-[0.6em]" : "mt-0.5 text-[0.5rem] tracking-[0.5em]"} pl-[0.5em] text-champagne`}>
        By Sadaf
      </span>
    </span>
  );
}
