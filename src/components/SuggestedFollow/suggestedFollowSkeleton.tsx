export const SuggestedFollowSkeleton = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full gap-3 mt-10 pr-5">
      <p className="text-white text-xl font-bold text-left">{`Suggested Followers`}</p>{" "}
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-between rounded-full border-[1px] border-[#2C2C2C] bg-[#353434bd] px-3 py-2 h-[60px] animate-pulse"
        />
      ))}{" "}
    </div>
  );
};
