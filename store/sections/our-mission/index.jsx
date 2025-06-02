"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const OurMission = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const valuesRef = useRef([]);

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
            textRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 }
        );

        valuesRef.current.forEach((value, i) => {
            tl.fromTo(
                value,
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 0.5 },
                `-=${0.5 - i * 0.1}`
            );
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`${font.className} bg-[#e1e1e1] py-16 px-6 md:px-12 lg:px-20 flex flex-col items-center text-center`}
        >
            {/* Section Title */}
            <h2 className="flex gap-3 md:gap-5 text-[#1a1a1a] items-center justify-center text-center text-2xl md:text-3xl font-space-grotesk font-bold md:mt-1  md:mb-8">
                <span className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#1a1a1a] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
                    Our Mission
                </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                At Indigo Amour, our mission is to preserve the rich heritage of
                Chamba's wool craftsmanship while creating a sustainable and
                eco-friendly future. We believe in the power of traditional practices
                combined with modern innovation to make a positive impact.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mt-4">
                From supporting local artisans to promoting natural dyeing techniques
                and ethical fashion, we aim to lead the way in preserving cultural
                heritage and fostering sustainable development.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[{ title: "Sustainability", content: "Reducing environmental impact through eco-friendly practices.", img: "/images/sustainability.jpg" }, { title: "Empowerment", content: "Supporting artisans and rural communities.", img: "/images/empowerment.jpg" }, { title: "Innovation", content: "Blending tradition with modern design and techniques.", img: "/images/innovation.jpg" }].map((card, i) => (
                    <div
                        key={i}
                        ref={(el) => (valuesRef.current[i] = el)}
                        className="relative bg-[#1a1a1a] shadow-md rounded-lg p-6 overflow-hidden h-36"
                    >
                        <img className="absolute opacity-40 -top-[50%] left-0 " src={card.img} alt="" />
                        <h3 className="text-xl font-semibold ">{card.title}</h3>
                        <p className="mt-2">
                            {card.content}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurMission;
