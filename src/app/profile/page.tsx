"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { use, useCallback, useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  ChangeIcon,
  CopyIcon,
  DateIcon,
  DiscordIcon,
  TelegramIcon,
} from "../../components/Svglist";
import { PostFilterBar } from "../../components/PostFilterBar";
import SearchBar from "../../components/SearchBar";
import { PostCard } from "../../models/PostCard";
import { PostData } from "../../Data/data";
import { BiCheck } from "react-icons/bi";
import { Console } from "console";
import { getMusicData } from "@/src/utils/api";
import { CollectionCard } from "@/src/models/CollectionCard";

const PostBar = dynamic(() => import("../../components/PostBar"), {
  ssr: false,
});

const Profile: NextPage = () => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [showPage, setShowPage] = useState("post");
  const { isAuthenticated, user } = useDynamicContext();
  const { userData, collectionData, getAllUploadMusic } =
    useContext(GetUserDataContext);

  const redirectIfNotAuthenticated = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isAuthenticated]);

  useEffect(() => {
    redirectIfNotAuthenticated();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [redirectIfNotAuthenticated]);

  useEffect(() => {
    // const searchParams = useSearchParams();
    // console.log("searchparams", searchParams);
    // const search = searchParams.get("tab");
    // console.log("search", search);
  }, [showPage]);

  const avatarImgUrl =
    userData.avatarImgUrl === ""
      ? "/imgs/avatars/initialAvatar.png"
      : process.env.NEXT_PUBLIC_PINATA_URL + userData.avatarImgUrl;
  const bannerImgUrl =
    userData.bannerImgUrl === ""
      ? "/imgs/banners/banner2.png"
      : process.env.NEXT_PUBLIC_PINATA_URL + userData.bannerImgUrl;

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const address = userData.userWallet;

  return (
    <div className="relative flex flex-col justify-center items-center lg:mt-0 lg:ml-[250px] xl:ml-[250px] w-full overflow-hidden">
      <div className="relative w-full">
        <div className="top-4 right-0 left-[100px] z-[9994] absolute flex justify-center items-center">
          <SearchBar />
        </div>
        <div className="relative w-full h-[250px]">
          <Image
            src={bannerImgUrl}
            alt="Banner"
            layout="fill"
            objectFit="cover"
            fill
          />
        </div>
        {/* <div
          className="right-[10px] lg:right-[60px] bottom-4 z-50 absolute flex gap-2 border-[#2c2c2c] border-[1px] bg-[#161616] hover:bg-[#111111] item-center p-2 rounded-lg font-bold text-md text-white transition-all duration-300 cursor-pointer jsutify-center"
        >
          <span className="mt-1">
            <ChangeIcon width={16} height={16} />
          </span>
          <span className="lg:block hidden">{`Change cover`}</span>
        </div> */}
      </div>
      <div className="flex xl:flex-row flex-col justify-between items-center xl:items-start xl:px-[50px] p-2 lg:pl-[20px] w-full lg:w-[750px] xl:w-[1024px] 2xl:w-[1224px]">
        <div className="flex flex-col justify-center xl:justify-start items-center xl:items-start gap-3 lg:w-[300px]">
          <div className="relative">
            <div className="relative -mt-[60px] lg:-mt-[70px] xl:-mt-[100px] w-[140px] lg:w-[140px] xl:w-[140px] h-[140px] lg:h-[140px] xl:h-[140px]">
              <img
                src={avatarImgUrl}
                alt="Profile Avatar"
                className="border-4 border-black rounded-2xl w-full h-full object-cover"
              />
            </div>
            {/* <div
              className="right-2 lg:right-3 bottom-2 lg:bottom-3 absolute flex justify-center items-center bg-[#161616] p-1 rounded-md lg:rounded-xl w-[26px] lg:w-[36px] h-[26px] lg:h-[36px] cursor-pointer"
            >
              <ChangeIcon width={25} height={25} />
            </div> */}
          </div>
          <p className="font-bold text-2xl text-white">{userData.name}</p>
          <div className="flex justify-start items-center gap-3">
            <span className="font-bold text-[#5E6866] text-sm">
              {user?.verifiedCredentials[0].address?.slice(0, 5) +
                "..." +
                user?.verifiedCredentials[0].address?.slice(-5)}
            </span>
            <CopyToClipboard text={address} onCopy={handleCopy}>
              <div className="cursor-pointer">
                {isCopied ? <BiCheck color="#5E6866" /> : <CopyIcon />}
              </div>
            </CopyToClipboard>
          </div>
          <div className="flex flex-col justify-start items-start gap-4 mt-4">
            <p className="font-bold text-md text-white">{`About Me`}</p>
            <span className="text-[#909997] text-sm">{userData.bio}</span>
          </div>
          <div className="flex flex-col justify-start items-start gap-4 mt-4">
            <p className="font-bold text-md text-white">{`Socials`}</p>
            <span className="flex justify-start items-start gap-3">
              <span className="cursor-pointer">
                <TelegramIcon />
              </span>
              <span className="cursor-pointer">
                <DiscordIcon />
              </span>
            </span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <DateIcon />
            <span className="text-[#909997] text-sm">{`Joined since june 24`}</span>
          </div>
        </div>
        <div className="flex flex-col mt-[45px] px-1 xl:pl-[50px] w-full xl:w-[calc(100%-300px)]">
          <div className="flex xl:flex-row flex-col justify-between items-center">
            <div className="flex justify-center items-center gap-1">
              <div className="flex flex-col justify-start items-center xl:items-start gap-2 w-[70px] lg:w-[100px] xl:w-[100px]">
                <p className="font-bold text-md text-white">{`23`}</p>
                <span className="text-[#5E6866] text-sm">{`Posts`}</span>
              </div>
              <div className="flex flex-col justify-start items-center xl:items-start gap-2 w-[70px] lg:w-[100px] xl:w-[100px]">
                <p className="font-bold text-md text-white">{`2.3k`}</p>
                <span className="text-[#5E6866] text-sm">{`Followers`}</span>
              </div>
              <div className="flex flex-col justify-start items-center xl:items-start gap-2 w-[70px] lg:w-[100px] xl:w-[100px]">
                <p className="font-bold text-md text-white">{`213`}</p>
                <span className="text-[#5E6866] text-sm">{`Collected`}</span>
              </div>
              <div className="flex flex-col justify-start items-center xl:items-start gap-2 w-[100px] lg:w-[100px] xl:w-[100px]">
                <p className="font-bold text-md text-white">{`23`}</p>
                <span className="text-[#5E6866] text-sm">{`Artist Backed`}</span>
              </div>
            </div>
            <div
              className="mt-4 xl:mt-0 w-auto cursor-pointer"
              onClick={() => router.push(`/profile/edit`)}
            >
              <div className="border-[#0cdee4] border-[1px] bg-transparent hover:bg-[#afafaf10] px-3 py-2 rounded-full font-bold text-center text-sm text-white transition-all duration-300">
                {`Edit Profile`}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-1 lg:gap-4 mt-6 w-full text-sm lg:text-md">
            <div
              className={` px-4 py-2 rounded-full cursor-pointer ${
                showPage === "post"
                  ? "border-[#2C2C2C] border-[1px] bg-[#161616]  text-white"
                  : "text-[#909997]"
              }`}
              onClick={() => (setShowPage("post"), router.push("?tab=post"))}
            >{`Post`}</div>
            <div
              className={` px-4 py-2 rounded-full cursor-pointer ${
                showPage === "collection"
                  ? "border-[#2C2C2C] border-[1px] bg-[#161616]  text-white"
                  : "text-[#909997]"
              }`}
              onClick={() => (
                setShowPage("collection"), router.push("?tab=collection")
              )}
            >{`Collection`}</div>
            <div
              className={` px-4 py-2 rounded-full cursor-pointer ${
                showPage === "release"
                  ? "border-[#2C2C2C] border-[1px] bg-[#161616]  text-white"
                  : "text-[#909997]"
              }`}
              onClick={() => (
                setShowPage("release"), router.push("?tab=release")
              )}
            >{`Releases`}</div>
            <div
              className={` px-4 py-2 rounded-full cursor-pointer ${
                showPage === "playlist"
                  ? "border-[#2C2C2C] border-[1px] bg-[#161616]  text-white"
                  : "text-[#909997]"
              }`}
              onClick={() => (
                setShowPage("playlist"), router.push("?tab=playlist")
              )}
            >{`Playlist`}</div>
          </div>
          {showPage === "post" && (
            <div>
              <div className="flex flex-col gap-4 mt-5">
                <PostBar />
                <PostFilterBar />
              </div>
              <div className="mt-5 pr-3 h-[850px] overflow-y-auto">
                <div className="flex flex-col justify-center items-center gap-10 mb-[300px]">
                  {PostData.map((data, index) => (
                    <PostCard {...data} key={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {showPage === "collection" && (
            <div>
              <div className="mt-5 pr-3 h-[850px] overflow-y-auto">
                <div className="flex flex-col justify-center items-center gap-10 mb-[300px]">
                  {collectionData.map((data, index) => (
                    <CollectionCard {...data} key={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
