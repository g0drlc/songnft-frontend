/* eslint-disable @next/next/no-img-element */
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";
import { UserDataType } from "@/src/types/menu";
import { followUnfollow } from "@/src/utils/api";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const SuggestedFollow = () => {
  const { isAuthenticated } = useDynamicContext();
  const { allUserDataForFollow, userData } = useContext(GetUserDataContext);

  const allUserData = useMemo(
    () => allUserDataForFollow,
    [allUserDataForFollow]
  );

  return (
    <div className="lg:w-[230px] xl:w-[330px] items-center justify-center lg:flex flex-col hidden gap-2 fixed mt-10">
      <p className="text-white text-xl font-bold text-left">{`Suggested Followers`}</p>
      {!isAuthenticated && (
        <p className="text-[#2C2C2C] text-sm font-bold text-left">{`nothing to show`}</p>
      )}
      {isAuthenticated &&
        allUserData &&
        allUserData
          .filter((data) => data.userWallet !== userData.userWallet)
          .map((data, index) => (
            <div
              className="w-full flex items-center justify-between rounded-full border-[1px] border-[#2C2C2C] bg-[#161616] px-3 py-2"
              key={index}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-11 h-11 rounded-full relative">
                  <img
                    src={process.env.NEXT_PUBLIC_PINATA_URL + data.avatarImgUrl}
                    alt="Suggested Follow Avatar"
                    className="rounded-full w-full h-full"
                  />
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="text-white text-md font-bold">{data.name}</p>
                  <span className="text-sm text-[#5E6866]">
                    {data.followers.length}
                    {` `}
                    {`Followers`}
                  </span>
                </div>
              </div>
              <FollowButton user={data} />
            </div>
          ))}
    </div>
  );
};

export default SuggestedFollow;

interface FollowButtonProps {
  user: UserDataType;
}

const FollowButton: FC<FollowButtonProps> = ({ user }) => {
  const { userData, getAllUser } = useContext(GetUserDataContext);
  const isFollowing = useMemo(() => {
    return user.followers.find((user) => user.userId === userData.userId);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [user]);

  const handleFollowToggle = async () => {
    const followerData = {
      ...userData,
      userEmail: userData.email,
    };
    await followUnfollow(followerData, user.userWallet);
    await getAllUser();
  };
  return (
    <button
      className={` border-[1px] border-[#0cdee4] rounded-full py-1 px-4 text-sm font-bold duration-300 transition-all
            ${isFollowing ? "bg-white text-black" : "bg-[#161616] text-white"}`}
      onClick={() => {
        handleFollowToggle();
      }}
    >
      {isFollowing ? `UnFollow` : "Follow"}
    </button>
  );
};
