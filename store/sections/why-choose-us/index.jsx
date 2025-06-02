import React from "react";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const WhyChooseUs = () => {
  return (
    <section
      className={`relative bg-[#e1e1e1] px-10 flex flex-col md:flex-row items-center justify-between ${font.className} pb-5`}
    >
      <div className="flex items-start rounded-xl justify-center bg-[#005689] text-neutral-50 w-full min-h-[75vh] px-5 md:px-10 pb-10">
        <div className="w-full max-w-7xl">
          <h2 className="flex gap-3 md:gap-5 items-center justify-center text-center text-2xl md:text-3xl font-space-grotesk font-bold md:mt-10  md:mb-8">
            <span className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
              Why Choose Us
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 px-4 md:px-8">
            <div className="flex flex-col items-center justify-center text-center">
              <img className="w-16 md:w-20" src="/gifs/innovation.gif" alt="Innovative Icon" />
              <h3 className="font-space-grotesk text-xl md:text-xl font-semibold my-4">Innovative</h3>
              <p className="text-sm md:text-md px-6">
                Blending traditional techniques with modern designs for unique, contemporary fashion.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <img className="w-16 md:w-20" src="/gifs/our-brand.gif" alt="Our Brand Icon" />
              <h3 className="font-space-grotesk text-xl md:text-xl font-semibold my-4">Our Brand</h3>
              <p className="text-sm md:text-md px-6">
                Reducing carbon footprint with hand-spun yarns, natural dyes, and indigenous organic fibers.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <img className="w-16 md:w-20" src="/gifs/woman-empowerment.gif" alt="Empowering Women Icon" />
              <h3 className="font-space-grotesk text-xl md:text-xl font-semibold my-4">Empowering Women</h3>
              <p className="text-sm md:text-md px-6">
                Collaborating with women weavers and spinners across India to preserve traditional crafts.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <img className="w-16 md:w-20" src="/gifs/reach.gif" alt="Our Reach Icon" />
              <h3 className="font-space-grotesk text-xl md:text-xl font-semibold my-4">Our Reach</h3>
              <p className="text-sm md:text-md px-6">
                Available through Delhi exhibitions and online portals promoting ethical fashion.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <img className="w-16 md:w-20" src='/gifs/product.gif' alt="Our Products Icon" />
              <h3 className="font-space-grotesk text-xl md:text-xl font-semibold my-4">Our Products</h3>
              <p className="text-sm md:text-md px-6">
                Naturally dyed Gaddi wool jackets, Kala Cotton stoles, handloom denim, and more.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <img className="w-16 md:w-20" src="/gifs/sustainable.gif" alt="Sustainable Practices Icon" />
              <h3 className="font-space-grotesk text-xl md:text-xl font-semibold my-4">Sustainable Practices</h3>
              <p className="text-sm md:text-md px-6">
                Reducing carbon footprint with hand-spun yarns, natural dyes, and indigenous organic fibers.
              </p>
            </div>
          </div>
        </div>
      </div></section>
  );
};

export default WhyChooseUs;