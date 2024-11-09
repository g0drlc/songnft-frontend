export const PostBarSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="bg-[#353434bd] rounded-3xl border-[rgb(44,44,44)] border-[1px] p-4 h-[70px] w-[90%] animate-pulse" />
      <div className="w-[50px] h-[50px] rounded-full bg-[#353434bd]"></div>
    </div>
  );
};
