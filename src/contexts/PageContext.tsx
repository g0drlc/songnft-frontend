"use client";
import { MusicDataType, GetPageDataContextValue } from "../types/menu";
import { createContext, useEffect, useState } from "react";

export const GetPageContext = createContext<GetPageDataContextValue>({
  showSidebar: false,
  showSidebarFunc: (hide: boolean) => {},
  showProfileDropdown: false,
  showProfileDropdownFunc: (hide: boolean) => {},
  showLoginModal: false,
  showLoginModalFunc: (hide: boolean) => {},
  loginState: false,
  music: [],
  setMusicFunc: (
    songImg: string,
    title: string,
    artistName: string,
    songUrl: string
  ) => {},
});

const GetPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [music, setMusic] = useState<MusicDataType[]>([]);
  const [loginState, setLoginState] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const showSidebarFunc = (hide: boolean) => {
    setShowSidebar(hide);
  };

  const showProfileDropdownFunc = (hide: boolean) => {
    setShowProfileDropdown(hide);
  };

  const showLoginModalFunc = (hide: boolean) => {
    setShowLoginModal(hide);
  };

  const setMusicFunc = (
    songImg: string,
    title: string,
    artistName: string,
    songUrl: string
  ) => {
    console.log("Here");
    const newMusic: MusicDataType = {
      songImg: songImg,
      title: title,
      artistName: artistName,
      songUrl: songUrl,
    };
    setMusic((prevMusic) => [...prevMusic, newMusic]);
  };

  useEffect(() => {
    const state = window.localStorage.getItem("login");
    setLoginState(state === "true" ? true : false);
  }, []);

  return (
    <GetPageContext.Provider
      value={{
        showSidebar,
        showSidebarFunc,
        showProfileDropdown,
        showProfileDropdownFunc,
        showLoginModal,
        showLoginModalFunc,
        loginState,
        music,
        setMusicFunc,
      }}
    >
      {children}
    </GetPageContext.Provider>
  );
};

export default GetPageProvider;
