"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import { FC, useContext } from "react";

import { GetUserDataContext } from "@/src/contexts/UserDataContext";
import { NEXT_ROUTER_PREFETCH } from "next/dist/client/components/app-router-headers";
import { UserDataType } from "@/src/types/menu";
import Profile from "@/src/app/profile/page";
import { useRouter } from "next/navigation";
const TopArtistsCarousel: FC = () => {
  const { topArtistsData, userData, setUserDataChanger } =
    useContext(GetUserDataContext);

  const router = useRouter();

  const dataLoading = (data: UserDataType) => {
    console.log("123456");
    router.replace("explore");
    router.push(`profile?name=${data.name}?userId=${data.userId}`);
    setUserDataChanger(data);
  };
  return (
    <div className="flex justify-center items-center my-10 w-full">
      <div className="w-[350px] md:w-[700px] lg:w-[700px] 2xl:w-[1240px] xl:w-[1024px]">
        <Carousel
          className="relative z-[1] bg-black"
          containerClass="container-with-dots"
          draggable
          autoPlay={true}
          autoPlaySpeed={1500}
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
          {topArtistsData.map((data, index) => (
            <div className="relative px-2" key={index}>
              <div className="relative border-[#3a963d] border-7 bg-white bg-opacity-10 backdrop-blur-md p-2 rounded-full w-full cursor-pointer aspect-square">
                <Image
                  src={process.env.NEXT_PUBLIC_PINATA_URL + data.avatarImgUrl}
                  fill
                  className="rounded-full w-[40px]"
                  alt=""
                  onClick={() => dataLoading(data)}
                />
              </div>
              <p className="bottom-0 mt-2 font-bold text-center text-sm text-white uppercase">
                {data.name}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TopArtistsCarousel;
function setUserDataChange(data: UserDataType) {
  throw new Error("Function not implemented.");
}
