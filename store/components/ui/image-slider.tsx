"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface ImageSliderProps {
  sliderData: [];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ sliderData }) => {
  console.log(sliderData);
  return (
    <div className="flex select-none w-full h-full items-center justify-center">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ type: "bullets", clickable: true }}
        autoplay={true}
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {sliderData?.map((imageData, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                <Image
                  height={315}
                  width={1702}
                  className="w-full"
                  src={imageData.url}
                  alt="images"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
