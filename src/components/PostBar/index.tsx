"use client";
import { useContext } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { FaUserAlt } from "react-icons/fa";
import { GetPageContext } from "../../contexts/PageContext";
import { PostAddIcon, PostUploadIcon } from "../Svglist";
import { ProfileDropdown } from "../ProfileDropdown";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";

const PostBar = () => {
  const routerPath = usePathname();
  const { showProfileDropdownFunc } = useContext(GetPageContext);
  const { userData } = useContext(GetUserDataContext);
  const { isAuthenticated, setShowAuthFlow } = useDynamicContext();

  const avatarImgUrl =
    userData?.avatarImgUrl === ""
      ? "/imgs/avatars/initialAvatar.png"
      : process.env.NEXT_PUBLIC_PINATA_URL + userData?.avatarImgUrl;

  return (
    <div className="w-full flex items-center justify-between gap-4 flex-row z-[9997]">
      <div
        className={`bg-[#161616] rounded-3xl border-[rgb(44,44,44)] border-[1px] p-4 relative ${
          routerPath === "/profile" ? "lg:w-full" : "lg:w-[90%] w-full"
        } w-auto z-50 flex gap-4 items-center justify-between
        hover:border-[#444444] duration-200 transition-all`}
      >
        {!isAuthenticated && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#161616] bg-opacity-40 rounded-3xl z-50 backdrop-blur-sm" />
        )}
        <div className="flex items-center justify-center gap-4 z-[49]">
          <div className="w-9 h-9 relative">
            <Image
              src={avatarImgUrl}
              alt="Avatar"
              className="object-cover rounded-full w-full h-full"
              fill
            />
          </div>
          <p className="text-[#464545de] cursor-pointer">{`Sign in to post...`}</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <PostAddIcon />
          <PostUploadIcon />
          <div className="text-black text-sm font-bold py-2 px-7 bg-[#0cdee4] rounded-full">{`Post`}</div>
        </div>
      </div>
      <>
        {!isAuthenticated ? (
          <div
            className="text-white font-bold text-md rounded-full py-2 px-10 cursor-pointer
      duration-300 transition-all bg-gradient-to-r from-[#0cdee4] to-[#b100fe] hover:shadow-lg hover:shadow-[#ffffff3f] z-[9999] hidden lg:block"
            onClick={() => setShowAuthFlow(true)}
          >{`SignIn`}</div>
        ) : (
          <>
            {routerPath !== "/profile" && (
              <div
                className="w-10 h-10 relative cursor-pointer hidden md:block"
                onClick={() => showProfileDropdownFunc(true)}
              >
                <Image
                  src={avatarImgUrl}
                  alt="Avatar"
                  className="object-cover rounded-full"
                  fill
                />
                <ProfileDropdown />
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default PostBar;
