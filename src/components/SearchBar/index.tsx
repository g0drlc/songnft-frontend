"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { SearchIcon } from "../Svglist";
import { GetPageContext } from "../../contexts/PageContext";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ProfileDropdown } from "../ProfileDropdown";

const SearchBar = () => {
  const { showProfileDropdown, showProfileDropdownFunc } =
    useContext(GetPageContext);
  const { isAuthenticated } = useDynamicContext();
  const { userData } = useContext(GetUserDataContext);

  const avatarImgUrl =
    userData.avatarImgUrl === ""
      ? "/imgs/avatars/initialAvatar.png"
      : process.env.NEXT_PUBLIC_PINATA_URL + userData.avatarImgUrl;

  const handleProfileDropdownClick = () => {
    showProfileDropdownFunc(!showProfileDropdown);
  };

  return (
    <div className="2xl:w-[1140px] xl:w-[900px] lg:w-[800px] hidden lg:flex items-center justify-between relative z-[9994]">
      <div className="w-[calc(100% - 50px)] flex py-2 px-3 gap-2 rounded-full outline-none border-[#2C2C2C] border-[1px] bg-[#161616] items-center justify-between">
        <SearchIcon />
        <input
          className="w-full bg-transparent outline-none placeholder:text-[#5E6866] text-white text-md"
          placeholder="Search..."
        />
        <button className="text-black text-md font-bold rounded-full px-4 py-1 bg-[#0cdee4]">
          Search
        </button>
      </div>
      {isAuthenticated && (
        <div
          className="w-9 h-9 relative cursor-pointer"
          onClick={handleProfileDropdownClick}
        >
          <img
            alt="Avatar"
            src={avatarImgUrl}
            className="rounded-full border-[1px] border-[#0cdee4] object-cover"
          />
        </div>
      )}
      <ProfileDropdown />
    </div>
  );
};

export default SearchBar;
