"use client";
import Image from "next/image";
import { FC } from "react";
import Carousel from "react-multi-carousel";

import { ExploreData } from "../../Data/data";

const MusicCarousel: FC = () => {
  return (
    <div className="w-full flex items-center justify-center my-10">
      <div className="2xl:w-[1240px] xl:w-[1024px] lg:w-[700px] w-[350px] md:w-[700px]">
        <Carousel
          className="bg-black z-[1] relative"
          containerClass="container-with-dots"
          draggable
          focusOnSelect={false}
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 6,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 768,
              },
              items: 5,
              partialVisibilityGutter: 30,
            },
          }}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          arrows={true}
          slidesToSlide={1}
          //   swipeable
        >
          {ExploreData.map((data, index) => (
            <div className="px-2 relative" key={index}>
              <div className="relative aspect-square w-full p-2 border-7 border-[#3a963d] bg-white bg-opacity-10 backdrop-blur-md rounded-xl cursor-pointer">
                <Image
                  src={data.img}
                  fill
                  className="w-90 rounded-2xl"
                  alt=""
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-[#ffffff00] to-[#000000f3] z-50 rounded-xl flex items-end justify-center pb-3">
                  <p className="text-white text-sm uppercase mt-2 bottom-0 font-bold">
                    {data.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MusicCarousel;
