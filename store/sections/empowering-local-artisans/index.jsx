"use client"
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const artisans = [
  {
    id: 1,
    name: "Chhatrari Artisans",
    quote: "Reviving Gaddi wool craftsmanship has brought back pride to our community.",
    image: "/images/chhatrari.jpg", //
  },
  {
    id: 2,
    name: "Saho Valley Women",
    quote: "Natural dyeing techniques have helped us reconnect with our heritage.",
    image: "/images/saho.jpg",
  },
  {
    id: 3,
    name: "Local Weaver",
    quote: "These workshops have enabled us to create eco-friendly products with global appeal.",
    image: "/images/weaver.jpg",
  },
];

const EmpoweringLocalArtisans = () => {
  useEffect(() => {
    gsap.fromTo(
      ".artisan-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".artisan-section",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="artisan-section bg-[#e1e1e1] py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Empowering Local Artisans
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Indigo Amour is dedicated to uplifting the local community in Himachal Pradesh by reviving traditional craftsmanship, promoting sustainable practices, and preserving cultural heritage through Gaddi wool and natural dyeing techniques.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="artisan-card bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105"
            >
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {artisan.name}
              </h3>
              <p className="text-gray-600 italic">"{artisan.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmpoweringLocalArtisans;
