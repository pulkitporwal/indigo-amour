"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RevivingALegacy = () => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP animation for steps
            timelineRef.current = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true,
                },
            });

            timelineRef.current
                .from(".title", { opacity: 0, y: 30, duration: 1 })
                .from(
                    ".content",
                    { opacity: 0, x: -50, duration: 1 },
                    "-=0.5"
                )
                .from(".step", { opacity: 0, y: 50, stagger: 0.3, duration: 1 });
        }, sectionRef);

        return () => ctx.revert(); // Cleanup GSAP context
    }, []);

    const steps = [
        {
            title: "Workshops with Villagers",
            description: "Empowering local communities by reconnecting them with traditional Gaddi wool practices.",
            image: "/images/villagers.jpg",
        },
        {
            title: "Natural Dyeing Techniques",
            description: "Utilizing natural ingredients like walnut shells and turmeric to create vibrant, eco-friendly colors.",
            image: "/images/natural-dyeing.jpg",
        },
        {
            title: "Sustainable Practices",
            description: "Promoting environmentally friendly methods that preserve Chamba's cultural and natural heritage.",
            image: "/images/sustainable-practice.jpg",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#e1e1e1] py-16 px-4 lg:px-20 text-gray-800"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="flex gap-3 md:gap-5 text-[#1a1a1a] items-center justify-center text-center text-2xl md:text-3xl font-space-grotesk font-bold md:mt-2  md:mb-8">
                    <span className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#1a1a1a] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
                        Reviving the Legacy
                    </span>
                </h2>

                {/* Content */}
                <p className="text-md content text-center max-w-4xl mx-auto">
                    Discover our efforts to revive the rich heritage of Gaddi wool
                    through innovative workshops, sustainable dyeing techniques, and eco-friendly practices.
                </p>

                {/* Steps Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="step bg-white shadow-lg rounded-lg pb-6 flex flex-col items-center text-center overflow-hidden transform hover:scale-105 transition-transform duration-300"
                        >
                            <div className="mb-4 w-full h-44 object-fill overflow-hidden">
                                <img

                                    src={step.image}
                                    alt={step.title}
                                    className="w-full object-fill object-center rounded-md mb-4"
                                />
                            </div>
                            <h3 className="text-xl px-6  font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600 px-6 ">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RevivingALegacy;