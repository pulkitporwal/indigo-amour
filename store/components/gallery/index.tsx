"use client";

import { Tab } from "@headlessui/react";
import Image from "next/image";
import { Image as ImageType } from "@/types";
import { useState } from "react";
import { Expand, MoveLeft, MoveRight } from "lucide-react";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(
    images.length > 0 ? 0 : -1
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        No images available
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col w-full">
      <Tab.Group
        key={images.length}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <div className="flex flex-col gap-4 h-full">
          <div className="relative aspect-square w-full">
            <Tab.Panels className="h-full w-full">
              {images.map((image) => (
                <Tab.Panel key={image.id} className="h-full w-full">
                  <div
                    className="relative flex items-center bg-neutral-100 justify-center h-full w-full rounded-lg overflow-hidden"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    style={{
                      cursor: isZoomed ? "zoom-out" : "zoom-in",
                    }}
                  >
                    <Image
                      priority
                      height={600}
                      width={350}
                      src={image.url}
                      alt="Product image"
                      className={`
                        object-cover object-center transition-transform duration-200
                        ${isZoomed ? "scale-150" : "scale-100"}
                      `}
                      style={{
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      }}
                    />
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={previousImage}
                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                  aria-label="Previous image"
                >
                  <MoveLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                  aria-label="Next image"
                >
                  <MoveRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Zoom Indicator */}
            <div className="absolute top-4 right-4">
              <Expand
                className={`
                w-6 h-6 transition-opacity duration-200
                ${isZoomed ? "opacity-0" : "opacity-50"}
              `}
              />
            </div>
          </div>

          {/* Thumbnail Row */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory lg:flex-row lg:overflow-y-auto">
            {images.map((image, index) => (
              <Tab
                key={image.id}
                className="relative overflow-hidden w-20 h-20 flex-shrink-0 snap-start cursor-pointer outline-none"
              >
                {({ selected }) => (
                  <div
                    className={`
                    w-full h-full rounded-lg overflow-hidden
                    ${
                      selected
                        ? "ring-2 ring-black opacity-60 bg-black"
                        : "ring-1 ring-gray-200"
                    }
                  `}
                  >
                    <Image
                      src={image.url}
                      alt="Thumbnail"
                      className="object-cover object-center"
                      fill
                      sizes="80px"
                    />
                  </div>
                )}
              </Tab>
            ))}
          </div>
        </div>
      </Tab.Group>
    </div>
  );
};

export default Gallery;
