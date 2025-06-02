import React from "react";
import { Leaf, Droplet, Scissors, ShoppingBag } from "lucide-react";

const TimelineStep = ({ icon, title, description, isLast }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div className="bg-[#005689] rounded-full p-2 md:p-5 mb-1">
                {React.cloneElement(icon, { className: "w-8 h-8 text-white" })}
            </div>
            {!isLast && <div className="w-0.5 h-full bg-indigo-200"></div>}
        </div>
        <div className="pb-2 text-[#1a1a1a] ">
            <h3 className="font-semibold mb-2 font-space-grotesk text-lg md:text-2xl ">
                {title}
            </h3>
            <p className={`text-neutral-600 text-sm md:text-lg ${!isLast && "h-[120px]"} font-space-grotesk`}>{description}</p>
        </div>
    </div>
);

const OurProcessTimeline = () => {
    const steps = [
        {
            icon: <Leaf />,
            title: "Sustainable Sourcing",
            description:
                "We begin by sourcing organic wool from Bhamour and Kala Cotton from Gujarat, supporting local communities and eco-friendly farming practices.",
        },
        {
            icon: <Droplet />,
            title: "Natural Dyeing",
            description:
                "Our fabrics are then dyed using natural ingredients like indigo, madder root, and pomegranate, minimizing environmental impact while creating beautiful, unique colors.",
        },
        {
            icon: <Scissors />,
            title: "Ethical Craftsmanship",
            description:
                "Skilled artisans, primarily women, hand-spin and weave our fabrics using traditional techniques. This step preserves cultural heritage and ensures high-quality, unique textiles.",
        },
        {
            icon: <ShoppingBag />,
            title: "Conscious Production",
            description:
                "Finally, we create small-batch, made-to-order pieces to reduce waste. Each item is crafted with care and attention to detail, resulting in sustainable, long-lasting fashion.",
        },
    ];

    return (
        <section className="bg-[#e1e1e1] py-16 z-10">
            <div className="container mx-auto px-4">
                <h2 className="flex gap-3 md:gap-5 text-[#1a1a1a] items-center justify-center text-center text-2xl md:text-3xl font-space-grotesk font-bold md:mt-2  md:mb-8">
                    <span className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#1a1a1a] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
                        Our Process
                    </span>
                </h2>
                <div className="max-w-3xl mx-auto">
                    {steps.map((step, index) => (
                        <TimelineStep
                            key={index}
                            {...step}
                            isLast={index === steps.length - 1}
                        />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        From crop to garment, we strive to minimize our carbon footprint and
                        maximize positive impact on communities.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OurProcessTimeline;