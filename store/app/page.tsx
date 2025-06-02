import HeroSection from "@/sections/hero";
import AboutSection from "@/sections/about";
import OurMission from "@/sections/our-mission";
import WhyChooseUs from "@/sections/why-choose-us";
import FeaturedCategories from "@/sections/featured-categories";
import Newsletter from "@/sections/testimonials";
import Testimonials from "@/sections/newsletter";
import Footer from "@/components/footer";
import Marquee from "@/components/ui/marquee";
import AnimatedNavbar from "@/components/ui/animated-navbar/navbar";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#1a1a1a] text-[#e1e1e1] ">
      <AnimatedNavbar />
      <HeroSection />
      <section className="w-screen h-10 bg-[#ED6370] text-[#1a1a1a] flex py-1">
        <Marquee speed={50} direction="left">
          <span className="text-md font-bold md:text-xl tracking-wide px-8">
            INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO
            AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦
            INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO
            AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦
            INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO
            AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦
            INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO
            AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦
            INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO
            AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦ INDIGO AMOUR ✦
          </span>
        </Marquee>
      </section>
      <AboutSection />
      <OurMission />
      <WhyChooseUs />
      <FeaturedCategories />
      <Newsletter />
      <Testimonials />
      <Footer />
    </div>
  );
}
