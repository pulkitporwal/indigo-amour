import Footer from "@/components/footer";
import AnimatedNavbar from "@/components/ui/animated-navbar/navbar";
import DeclineOfTradition from "@/sections/decline-of-tradition";
import DyeingProcess from "@/sections/dyeing-process";
import EmpoweringLocalArtisans from "@/sections/empowering-local-artisans";
import OurStoryHeroSection from "@/sections/hero-our-story";
import RevivingALegacy from "@/sections/reviving-legacy";


export default function OurStory() {
    return (
        <div className="relative overflow-hidden">
            <AnimatedNavbar />
            <OurStoryHeroSection />
            <DeclineOfTradition />
            <RevivingALegacy />
            <DyeingProcess />
            <EmpoweringLocalArtisans />
            <Footer />
        </div>
    );
}
