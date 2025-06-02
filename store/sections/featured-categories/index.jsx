"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const FeaturedCategories = () => {
    const categoriesRef = useRef([]);

    useEffect(() => {
        gsap.fromTo(
            categoriesRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
            }
        );
    }, []);

    return (
        <section className="bg-[#e1e1e1] flex items-center justify-center py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    Explore Our Categories
                </h2>
                <div className="flex items-center flex-col lg:flex-row justify-center gap-6">
                    {[
                        {
                            title: "Handloom Clothing",
                            href: "/",
                            description:
                                "Discover handwoven clothes crafted with love and tradition.",
                            image: "/images/category-1.webp",
                        },
                        {
                            title: "Eco-friendly Accessories",
                            href: "/",
                            description:
                                "Stylish accessories made with sustainable materials.",
                            image: "/images/category-2.webp",
                        },
                        {
                            title: "Natural Dye Fabrics",
                            href: "/",
                            description:
                                "Fabrics dyed with 100% natural colors for a sustainable touch.",
                            image: "/images/category-3.webp",
                        },
                    ].map((category, index) => (
                        <Link
                            href={category.href}
                            key={index}
                            className="group bg-[#1a1a1a] relative shadow-lg rounded-lg overflow-hidden transform transition duration-300 border-none h-[500px] max-h-[500px] max-w-[250px]"
                            ref={(el) => (categoriesRef.current[index] = el)}
                        >
                            <img
                                src={category.image}
                                alt={category.title}
                                className="absolute -z-10 top-0 left-0 w-full h-full object-cover transition-transform duration-300 transform opacity-55 group-hover:scale-105"
                            />
                            <div className="p-6 w-full h-full flex justify-end flex-col ">
                                <h3 className="text-lg z-10 font-semibold text-[#e1e1e1]">
                                    {category.title}
                                </h3>
                                <p className="text-sm z-10 text-white mt-2">
                                    {category.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
