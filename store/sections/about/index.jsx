"use client"

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1 }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-[#e1e1e1] py-16 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between ${font.className} gap-10 `}
    >
      <div
        ref={imageRef}
        className="w-full md:w-1/2 mb-8 md:mb-0 flex gap-5 justify-center"
      >
        <img
          src="/images/who-we-are.png"
          alt="Indigo Amour team"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>

      <div
        ref={textRef}
        className="w-full md:w-1/2 space-y-6 text-center md:text-left"
      >
        <h2 className="flex gap-3 md:gap-5 text-[#1a1a1a] items-center justify-center text-center text-2xl md:text-3xl font-space-grotesk font-bold md:mt-10  md:mb-8">
          <span className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#1a1a1a] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
            Who we are?
          </span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At Indigo Amour, we are more than just a clothing brand—we are
          custodians of a legacy. Inspired by the rich traditions of Chamba,
          Himachal Pradesh, our mission is to blend heritage with innovation,
          crafting timeless pieces from Gaddi wool using sustainable practices.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          With a commitment to supporting local artisans and eco-friendly
          production, Indigo Amour celebrates the intricate beauty of
          handcrafted products while ensuring a positive impact on the planet.
          Each piece is a story of dedication, culture, and responsibility.
        </p>
        <button className="hover:opacity-75 text-[#1a1a1a] hover:bg-[#1a1a1a] duration-300 hover:text-[#e1e1e1] text-md border border-[#1a1a1a] rounded-full p-0 px-3 py-1 m-0">
          Explore Our Story
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
