export const SideBarSkeleton = () => {
  return (
    <div
      className={`top-0 left-0 lg:w-[250px] xl:w-[300px] lg:bg-[#000000] duration-200 transition-all bg-[#161616] z-[9999] border-r-[1px] border-[#2C2C2C] h-full flex-col items-center justify-start gap-5 fixed lg:flex 
   
  `}
    >
      <div className="w-full flex items-center justify-center mt-5 animate-pulse ">
        <div className="w-[100px] h-[100px] bg-[#353434bd] rounded-2xl" />
      </div>
      <div className="w-full flex items-center flex-col gap-3 px-5 animate-pulse ">
        <div className="w-full bg-[#353434bd] rounded-full h-[40px]"></div>
        <div className="w-full bg-[#353434bd] rounded-full h-[40px]"></div>
        <div className="w-full bg-[#353434bd] rounded-full h-[40px]"></div>
      </div>
      <div className="w-full flex items-center flex-col gap-3 px-5 mt-10 animate-pulse ">
        <div className="w-[40px] bg-[#353434bd] rounded-full h-[40px]"></div>
        <div className="w-full bg-[#353434bd] rounded-full h-[20px]"></div>
        <div className="w-full bg-[#353434bd] rounded-full h-[20px]"></div>
        <div className="w-full bg-[#353434bd] rounded-full h-[40px]"></div>
      </div>
      <div className="items-center flex-col gap-3 px-5 mt-10 fixed bottom-5 flex animate-pulse ">
        <div className="w-[100px] bg-[#353434bd] rounded-full h-[20px]"></div>
        <div className="w-[100px] bg-[#353434bd] rounded-full h-[20px]"></div>
        <div className="w-[100px] bg-[#353434bd] rounded-full h-[20px]"></div>
        <div className="flex items-center justify-center gap-3">
          <div className="w-[40px] bg-[#353434bd] rounded-full h-[40px]"></div>
          <div className="w-[40px] bg-[#353434bd] rounded-full h-[40px]"></div>
          <div className="w-[40px] bg-[#353434bd] rounded-full h-[40px]"></div>
        </div>
        <div className="w-[100px] bg-[#353434bd] rounded-full h-[20px] animate-pulse "></div>
      </div>
    </div>
  );
};
