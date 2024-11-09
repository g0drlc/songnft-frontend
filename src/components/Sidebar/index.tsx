"use client";
import { useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { GetPageContext } from "../../contexts/PageContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import menuData from "./menuData";
import {
  CloseIcon,
  DiscordIcon,
  NotLoginIcon,
  TelegramIcon,
  TwitterIcon,
} from "../Svglist";
import { Menu } from "@/src/types/menu";

const Sidebar = () => {
  const { showSidebar, showSidebarFunc } = useContext(GetPageContext);
  const { isAuthenticated, setShowAuthFlow } = useDynamicContext();

  const router = useRouter();
  const pathname = usePathname();

  const divRef = useRef<HTMLDivElement>(null);
  const swipeHandler = useSwipeable({
    onSwipedLeft: () => showSidebarFunc(false),
    onSwipedRight: () => showSidebarFunc(true),
    trackMouse: true,
  });

  useOnClickOutside(divRef, () => showSidebarFunc(false));

  const handleMenuItemClick = (menu: Menu) => {
    const href =
      menu.path === "/profile" && isAuthenticated
        ? menu.path
        : menu.path !== "/profile"
        ? menu.path
        : "/";

    if (menu.path === "/profile" && !isAuthenticated) {
      showSidebarFunc(false);
      setShowAuthFlow(true);
    } else {
      showSidebarFunc(false);
      router.push(href!);
    }
  };

  const renderMenuItem = (menu: Menu, index: number) => {
    return (
      <div
        key={index}
        className={`flex items-center justify-start gap-2 duration-300 transition-all ${
          pathname === menu.path
            ? "bg-[#0cdee4]"
            : "bg-transparent hover:bg-[#66666623]"
        } rounded-full w-full px-[12px] py-2`}
        onClick={() => handleMenuItemClick(menu)}
      >
        {pathname === menu.path ? menu.enableIcon : menu.disableIcon}
        <p
          className={`text-md font-bold ${
            pathname === menu.path ? "text-black" : "text-white"
          }`}
        >
          {menu.title}
        </p>
      </div>
    );
  };

  return (
    <div
      className={`top-0 left-0 lg:w-[250px] xl:w-[300px] lg:bg-[#000000] duration-200 transition-all bg-[#161616] z-[9999] border-r-[1px] border-[#2C2C2C] h-full flex-col items-center justify-start gap-5 fixed lg:flex ${
        showSidebar ? "w-[300px] z-[9999]" : "w-0"
      }`}
      {...swipeHandler}
      ref={divRef}
    >
      <div className="w-full flex items-center justify-center">
        <Link href={"/"}>
          <div className="w-[140px] h-[80px] relative mt-5 hidden lg:block">
            <Image
              src={"/imgs/logo5.png"}
              fill
              alt="logo"
              className="object-cover"
            />
          </div>
        </Link>
      </div>
      <div
        className={`w-full flex items-center justify-between p-5 lg:hidden cursor-pointer ${
          showSidebar ? "flex" : "hidden"
        }`}
      >
        <p className="text-white text-md font-bold">{`Menu`}</p>
        <div
          className="flex items-center justify-center"
          onClick={() => showSidebarFunc(false)}
        >
          <CloseIcon />
        </div>
      </div>
      <div
        className={`lg:flex ${
          showSidebar ? "flex" : "hidden"
        } flex-col items-center justify-center cursor-pointer gap-4 w-full px-4 border-b-[1px] border-[#2c2c2c] lg:pb-6 pb-2`}
      >
        {menuData.map((menu, index) => renderMenuItem(menu, index))}
      </div>
      {!isAuthenticated && (
        <div
          className={`w-full mt-2 lg:flex ${
            showSidebar ? "flex" : "hidden"
          } items-center justify-center flex-col gap-4 text-center px-4`}
        >
          <NotLoginIcon />
          <p className="text-white text-lg">{`You are not Logged in`}</p>
          <span className="text-[#5E6866] text-sm">{`Login to your account to get the full experience`}</span>
          <button
            className="text-white border-[1px] rounded-full border-[#0cdee4] p-2 w-full cursor-pointer duration-300 transition-all hover:bg-[#2222228c]"
            onClick={() => setShowAuthFlow(true)}
          >{`Login`}</button>
        </div>
      )}

      {isAuthenticated && (
        <div className="w-full" onClick={() => router.push("/create")}>
          <div
            className={`flex items-center justify-center px-4 lg:flex ${
              showSidebar ? "flex" : "hidden"
            }`}
            onClick={() => showSidebarFunc(false)}
          >
            <div className="text-white font-bold text-md rounded-full py-2 px-10 cursor-pointer duration-300 transition-all bg-gradient-to-r from-[#0cdee4] to-[#b100fe] mt-5">{`+ Create`}</div>
          </div>
        </div>
      )}

      <div
        className={`lg:flex absolute bottom-0 right-0 left-0 items-center justify-center flex-col gap-2 ${
          showSidebar ? "flex" : "hidden"
        }`}
      >
        <p className="text-white text-sm cursor-pointer">{`For an Artist`}</p>
        <p className="text-white text-sm cursor-pointer">{`Term of service`}</p>
        <p className="text-white text-sm cursor-pointer">{`Privacy Policy`}</p>
        <div className="flex items-center justify-center gap-4 lg:mt-6 mt-1">
          <span className="cursor-pointer">
            <TelegramIcon />
          </span>
          <span className="cursor-pointer">
            <DiscordIcon />
          </span>
          <span className="cursor-pointer">
            <TwitterIcon />
          </span>
        </div>
        <p className="text-white text-sm cursor-pointer lg:my-6 my-1">{`© 2024 Audiomood`}</p>
      </div>
    </div>
  );
};

export default Sidebar;
