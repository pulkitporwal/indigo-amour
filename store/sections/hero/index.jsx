"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Inknut_Antiqua } from "next/font/google";

const hero_font = Inknut_Antiqua({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const HeroSection = () => {
  const headingRef1 = useRef(null);
  const headingRef2 = useRef(null);

  useEffect(() => {
    const spans1 = headingRef1.current.querySelectorAll("span");
    const spans2 = headingRef2.current.querySelectorAll("span");

    gsap.set([spans1, spans2], { opacity: 0, y: 50 });

    gsap.to([spans1, spans2], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
      delay: 0.5,
    });
  }, []);

  return (
    <div className="relative bg-[#1a1a1a] flex items-start justify-start flex-col h-[100vh]">
      <div className="w-full h-full lg:rounded-2xl lg:m-2 overflow-hidden object-fill">
        <video autoPlay muted loop className="opacity-25 w-full h-full object-cover" src="/videos/weaving.mp4" />
      </div>

      <h3
        ref={headingRef1}
        className={`hero-heading overflow-hidden absolute ${hero_font.className} text-3xl lg:text-5xl px-10 bottom-32 leading-10 lg:leading-loose`}
      >
        <span className="inline-block">Reviving</span>{" "}
        <span className="inline-block text-[#ED6370]">Traditions,</span>{" "}
      </h3>

      <h3
        ref={headingRef2}
        className={`hero-heading overflow-hidden absolute ${hero_font.className}  text-3xl lg:text-5xl px-10 bottom-12 leading-10 lg:leading-loose`}
      >
        <span className="inline-block">Weaving</span>{" "}
        <span className="inline-block text-green-500">Sustainability.</span>
      </h3>
    </div>
  );
};

export default HeroSection;
