"use client";
import { NextPage } from "next";
import { PostData } from "../Data/data";
import { ArrowIcon } from "../components/Svglist";
import { PostCard } from "../models/PostCard";
import dynamic from "next/dynamic";
import { PostBarSkeleton } from "../components/PostBar/postBarSkeleton";
import { SuggestedFollowSkeleton } from "../components/SuggestedFollow/suggestedFollowSkeleton";

const PostBar = dynamic(() => import("../components/PostBar"), {
  ssr: false,
  loading: () => <PostBarSkeleton />,
});

const SuggestedFollow = dynamic(() => import("../components/SuggestedFollow"), {
  ssr: false,
  loading: () => <SuggestedFollowSkeleton />,
});

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen items-start justify-center w-full lg:ml-[250px] xl:ml-[300px] 2xl:ml-[300px] relative overflow-hidden mt-[90px] lg:mt-0">
      <div className="xl:w-[calc(100%-350px)] md:px-[66px] px-5 py-[20px] flex items-center justify-center flex-col gap-4 relative z-[9996]]">
        <div className="flex flex-col gap-10">
          <div className="lg:w-[1024px] h-[594px] filter blur-[200px] bg-[#F2F2F2] opacity-15 absolute top-[-300px]" />
          <div className="w-full flex items-center gap-2">
            <PostBar />
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="text-white font-bold text-2xl">{`Post`}</p>
            <div
              className="flex items-center justify-center gap-1 rounded-full border-[1px] border-[#0cdee4] py-2 font-bold px-2 cursor-pointer z-[51]
          duration-300 transition-all hover:bg-[#00000054]"
            >
              <p className="text-white text-sm">{`Newest`}</p>
              <ArrowIcon />
            </div>
          </div>
          <div className="flex gap-5 flex-col mb-[160px] md:mb-[130px]">
            {PostData.map((data, index) => (
              <PostCard {...data} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="xl:w-[350px] xl:block hidden">
        <SuggestedFollow />
      </div>
      <div className="w-[412px] h-[424px] absolute bottom-0 right-0 rounded-full bg-[#379A95] opacity-15 filter blur-[200px] -z-50" />
    </main>
  );
};

export default Home;
