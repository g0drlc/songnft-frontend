"use client";
import { useContext } from "react";
import { CloseIcon } from "../Svglist";
import { GetPageContext } from "../../contexts/PageContext";

export const LoginModal = () => {
  const { showLoginModal, showLoginModalFunc } = useContext(GetPageContext);

  const handleLoginFunc = () => {
    window.localStorage.setItem("login", "true");
    showLoginModalFunc(false);
    window.location.reload();
  };

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center backdrop-blur-sm ${
        !showLoginModal && "hidden"
      }`}
    >
      <div className="w-[350px] bg-[#161616] rounded-xl relative flex items-center justify-start flex-col p-2 gap-8 pt-5">
        <div
          className="flex items-center justify-center rounded-full p-1 absolute top-1 right-1 cursor-pointer"
          onClick={() => showLoginModalFunc(false)}
        >
          <CloseIcon />
        </div>
        <p className="text-xl text-white font-bold">{`Log in or Sign up`}</p>
        <div className="w-full border-[#2C2C2C] border-[1px] rounded-full py-2 px-3 bg-[#0a0a0a]">
          <input
            className="w-full bg-transparent placeholder:text-[#5E6866] text-sm outline-none"
            placeholder="Email address"
          />
        </div>
        <div
          className="w-full rounded-full bg-[#0cdee4] text-black font-bold text-sm text-center p-2 cursor-pointer transition-all duration-300 hover:bg-[#0cdde4cb]"
          onClick={() => handleLoginFunc()}
        >{`Continue`}</div>
        <div className="w-full flex items-center justify-center gap-4">
          <div className="h-[1px] bg-[#2C2C2C] w-full" />
          <p>{`OR`}</p>
          <div className="h-[1px] bg-[#2C2C2C] w-full" />
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="rounded-xl border-[#2c2c2c] border-[1px] p-2 bg-transparent flex items-center justify-center gap-3">
            {`Metamask`}
          </div>
          <div className="rounded-xl border-[#2c2c2c] border-[1px] p-2 bg-transparent flex items-center justify-center gap-3">
            {`OKX`}
          </div>
          <div className="rounded-xl border-[#2c2c2c] border-[1px] p-2 bg-transparent flex items-center justify-center gap-3">
            {`WalletConnect`}
          </div>
          <div className="rounded-xl border-[#2c2c2c] border-[1px] p-2 bg-transparent flex items-center justify-center gap-3">
            {`Rainbow`}
          </div>
        </div>
      </div>
    </div>
  );
};
