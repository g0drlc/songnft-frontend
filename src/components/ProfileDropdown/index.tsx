import { useContext, useRef } from "react";
import Image from "next/image";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { GetPageContext } from "../../contexts/PageContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import {
  AccountSettingsIcon,
  BigDollarIcon,
  CopyIcon,
  LogoutIcon,
  StarIcon,
} from "../Svglist";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";

export const ProfileDropdown = () => {
  const { showProfileDropdownFunc, showProfileDropdown } =
    useContext(GetPageContext);
  const { userData } = useContext(GetUserDataContext);
  const { handleLogOut } = useDynamicContext();

  const divRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(divRef, () => showProfileDropdownFunc(false));

  const avatarImgUrl =
    userData?.avatarImgUrl === ""
      ? "/imgs/avatars/initialAvatar.png"
      : process.env.NEXT_PUBLIC_PINATA_URL + userData?.avatarImgUrl;

  return (
    <div
      className={`absolute right-0 z-[9999] top-12 shadow-2xl shadow-[#ffffff34] rounded-3xl ${
        !showProfileDropdown && "hidden"
      }`}
    >
      <div
        className="flex flex-col justify-start items-start gap-4 border-[#2c2c2c] border-[1px] bg-[#161616] p-4 rounded-3xl w-[298px]"
        ref={divRef}
      >
        <div className="flex justify-start items-center gap-[10px]">
          <div className="relative w-10 h-10 cursor-pointer">
            <Image
              src={avatarImgUrl}
              alt="Avatar"
              className="rounded-full"
              fill
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-md text-white">{userData?.name}</p>
            <p className="flex justify-center items-center gap-2">
              {userData?.userWallet && (
                <span className="text-[#6B6B6B] text-sm">
                  {userData.userWallet.slice(0, 5) +
                    "..." +
                    userData.userWallet.slice(-5)}
                </span>
              )}
              <span className="cursor-pointer">
                <CopyIcon />
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-black p-4 rounded-xl w-full">
          <div className="flex justify-between items-center w-full">
            <span className="text-[#5E686] text-sm">{`Solana`}</span>
            <p className="font-bold text-lg text-white">
              {0} {`SOL`}
            </p>
          </div>
          <div className="flex justify-between items-center gap-5 w-full">
            <div className="border-[#0cdee4] border-[1px] px-3 py-2 rounded-full w-1/2 font-bold text-center text-sm text-white cursor-pointer">
              {`Bridge`}
            </div>
            <div className="bg-[#0cdee4] hover:bg-[#0cdde4c7] px-3 py-2 rounded-full w-1/2 font-bold text-black text-center text-sm duration-300 cursor-pointer">
              {`Send`}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3 w-full">
          <div className="flex justify-start items-center gap-3 cursor-pointer">
            <BigDollarIcon />
            <p className="text-sm text-white">{`My Earnings`}</p>
          </div>
          <div className="flex justify-start items-center gap-3 cursor-pointer">
            <AccountSettingsIcon />
            <p className="text-sm text-white">{`Account Settings`}</p>
          </div>
          <div className="flex justify-start items-center gap-3 cursor-pointer">
            <StarIcon />
            <p className="text-sm text-white">{`For Artist`}</p>
          </div>
          <div
            className="flex justify-start items-center gap-3 text-[#FF7B72] hover:text-[#FF7B72] cursor-pointer"
            onClick={handleLogOut}
          >
            <LogoutIcon />
            <p className="text-sm duration-300">{`Logout`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
