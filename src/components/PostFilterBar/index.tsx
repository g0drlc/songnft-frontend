import { ArrowIcon } from "../Svglist";

export const PostFilterBar = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-white font-bold text-xl">{`Post`}</p>
      <div className="flex items-center justify-center gap-2 rounded-full border-[1px] border-[#0cdee4] py-2 px-3 cursor-pointer">
        <p className="text-white text-sm">{`Newest`}</p>
        <ArrowIcon />
      </div>
    </div>
  );
};
