"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { GetPageContext } from "../../contexts/PageContext";
import { MobileMenuIcon } from "../Svglist";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { usePathname } from "next/navigation";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";
import { ProfileDropdown } from "../ProfileDropdown";

export const Header = () => {
  const routerPath = usePathname();

  const { isAuthenticated, setShowAuthFlow } = useDynamicContext();
  const { showSidebarFunc, showProfileDropdownFunc } =
    useContext(GetPageContext);
  const { userData } = useContext(GetUserDataContext);

  const avatarImgUrl =
    userData?.avatarImgUrl === ""
      ? "/imgs/avatars/initialAvatar.png"
      : process.env.NEXT_PUBLIC_PINATA_URL + userData?.avatarImgUrl;

  return (
    <div className="w-full bg-black z-[9998] flex items-center justify-between lg:hidden h-[80px] fixed border-b-[1px] border-gray-800 px-5">
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center justify-center gap-2">
          <div className="cursor-pointer" onClick={() => showSidebarFunc(true)}>
            <MobileMenuIcon />
          </div>
          <Link href="/">
            <div className="w-[100px] h-[40px] relative">
              <Image
                src={"/imgs/logo5.png"}
                fill
                alt="Logo"
                className="object-cover"
              />
            </div>
          </Link>
        </div>
        {!isAuthenticated ? (
          <div
            className="text-white font-bold text-md rounded-full py-2 px-10 cursor-pointer
      duration-300 transition-all bg-gradient-to-r from-[#0cdee4] to-[#b100fe] hover:shadow-lg hover:shadow-[#ffffff3f] z-[9999]"
            onClick={() => setShowAuthFlow(true)}
          >{`SignIn`}</div>
        ) : (
          <>
            {routerPath !== "/profile" && (
              <div
                className="w-10 h-10 relative cursor-pointer"
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
      </div>
    </div>
  );
};
