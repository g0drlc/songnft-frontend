import Image from "next/image";
export const FollowDrop = (props: { posterAvatar: string; name: string }) => {
  return (
    <div
      className="absolute w-[300px] pb-2 top-[60px] bg-black rounded-xl -left-3 group-hover:opacity-100 duration-300 transition-all opacity-0 -z-[9999]
        group-hover:z-[9999] shadow-2xl
      "
    >
      <div className="w-full h-[80px] relative">
        <Image
          src={"/imgs/banners/banner1.png"}
          alt="Banner"
          fill
          className="rounded-t-xl object-cover"
        />
      </div>
      <div className="w-[80px] h-[80px] relative ml-4 -mt-10">
        <Image
          src={props.posterAvatar}
          alt="Banner"
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <div className="w-full flex items-center justify-between px-3">
        <div className="flex items-start justify-start flex-col">
          <p className="text-md text-white font-bold">{props.name}</p>
          <span className="text-sm text-gray-600 font-bold">
            {`0x32423523`.slice(0, 5)}
          </span>
        </div>
        <div className="text-black bg-white rounded-xl px-3 py-1 text-sm font-bold">{`Follow`}</div>
      </div>
      <div className="w-full flex items-center justify-between px-3 mt-4">
        <div className="flex items-start justify-start flex-col">
          <p className="text-sm font-bold text-white">{15}</p>
          <span className="text-sm text-gray-600 font-bold">{"Minted"}</span>
        </div>{" "}
        <div className="flex items-start justify-start flex-col">
          <p className="text-sm font-bold text-white">{19}</p>
          <span className="text-sm text-gray-600 font-bold">{"Followers"}</span>
        </div>{" "}
        <div className="flex items-start justify-start flex-col">
          <p className="text-sm font-bold text-white">{100}</p>
          <span className="text-sm text-gray-600 font-bold">{"Following"}</span>
        </div>
      </div>
    </div>
  );
};
