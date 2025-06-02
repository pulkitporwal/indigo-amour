"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const DeclineOfTradition = () => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);

    const points = [
        {
            title: "Modernization and Synthetic Fibers",
            description:
                "Mass-produced synthetic materials like acrylic and polyester have replaced natural wool due to their affordability and low maintenance. This shift has significantly reduced demand for traditional woolen products.",
        },
        {
            title: "Changing Livelihoods",
            description:
                "Younger generations are moving to urban areas for jobs, leaving behind the labor-intensive craft of weaving and sheep rearing.",
        },
        {
            title: "Environmental Challenges",
            description:
                "Climate change and deforestation have reduced grazing lands, affecting sheep rearing and wool quality.",
        },
        {
            title: "Globalization",
            description:
                "Access to global markets has introduced cheaper, synthetic alternatives that mimic wool, pushing traditional crafts to the sidelines.",
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP animation for text and timeline
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
                    "-=0.5" // Overlap animation
                )
                .from(".timeline-item", { opacity: 0, y: 30, stagger: 0.3, duration: 1 });
        }, sectionRef);

        return () => ctx.revert(); // Cleanup GSAP context
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#e1e1e1] py-16 px-4 lg:px-20 text-gray-800"
        >
            <img src="/images/sheep-grazing.png" alt="vector" className="absolute bottom-0 left-0 w-52" />
            <img src="/images/thread.png" alt="vector" className="absolute top-12 right-10 w-24 -rotate-45 " />
            <img src="/images/sui.png" alt="vector" className="absolute bottom-12 right-10 w-32 " />
            <div className="max-w-5xl mx-auto">
                <h2 className="flex gap-3 md:gap-5 text-[#1a1a1a] items-center justify-center text-center text-2xl md:text-3xl font-space-grotesk font-bold md:mt-2  md:mb-8">
                    <span className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#1a1a1a] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
                        The Decline of Tradition
                    </span>
                </h2>

                <p className="text-md mb-8 content">
                    Chamba, known for its rich heritage of Gaddi wool production and
                    weaving, has faced a steep decline in recent decades. The advent of
                    synthetic alternatives, urban migration, and a shift in market
                    dynamics have eroded the once-thriving tradition. Here’s a timeline
                    of the challenges:
                </p>


                <div className="gap-9 grid grid-cols-2 grid-rows-2 justify-items-start items-start ">
                    {points.map((point, index) => (
                        <div key={index} className="timeline-item cursor-pointer bg-white border rounded-lg p-5 ">
                            <h3 className="text-lg group-hover: text-center font-semibold">{point.title}</h3>
                            <p className="text-sm text-center text-neutral-600 mt-2 ">{point.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DeclineOfTradition;
