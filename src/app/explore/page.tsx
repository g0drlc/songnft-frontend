import type { NextPage } from "next";
import MusicCarousel from "../../components/Carousel/MusicCarousel";
import TopArtistsCarousel from "../../components/Carousel/TopArtistsCarousel";
import SearchBar from "../../components/SearchBar";

const Explore: NextPage = () => {
  return (
    <div className="flex items-center justify-center w-full lg:ml-[300px] p-3 mt-20 lg:mt-0 relative overflow-hidden flex-col mb-[200px] lg:mb-auto">
      <div className=" 2xl:w-[1440px] xl:w-[1020px] lg:w-[680px] flex items-start justify-start flex-col">
        <div className="w-full flex items-center justify-between py-5 gap-5">
          <div className="relative z-[9999] flex items-center justify-center">
            <SearchBar />
          </div>
        </div>
        <div className="w-full flex item-center justify-between">
          <p className="text-white text-2xl font-bold">{`Featured Artist`}</p>
        </div>
        <MusicCarousel />
        <div className="w-full flex item-center justify-between">
          <p className="text-white text-2xl font-bold">{`Top Artist`}</p>
        </div>
        <TopArtistsCarousel />
      </div>
    </div>
  );
};

export default Explore;
