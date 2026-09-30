import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyActions from "@/components/layout/StickyActions";
import Cursor from "@/components/motion/Cursor";
import Motion from "@/components/motion/Motion";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Hero from "@/components/sections/Hero";
import BrandIntro from "@/components/sections/BrandIntro";
import Signatures from "@/components/sections/Signatures";
import BridalShowcase from "@/components/sections/BridalShowcase";
import VideoMoment from "@/components/sections/VideoMoment";
import SplitBeauty from "@/components/sections/SplitBeauty";
import InsideBellagio from "@/components/sections/InsideBellagio";
import Gallery from "@/components/sections/Gallery";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Social from "@/components/sections/Social";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BrandIntro />
        <Signatures />
        <BridalShowcase />
        <VideoMoment />
        <SplitBeauty />
        <InsideBellagio />
        <Gallery />
        <Process />
        <Testimonials />
        <Social />
        <FinalCta />
      </main>
      <Footer />
      <StickyActions />
      <Cursor />
      <SmoothScroll />
      <Motion />
    </>
  );
}
