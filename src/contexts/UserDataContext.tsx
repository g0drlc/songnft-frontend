"use client";
import {
  collectionDataType,
  GetUserDataContextValue,
  UserDataType,
} from "../types/menu";
import { createContext, useEffect, useMemo, useState } from "react";
import { getAllUserData, getMusicData, getUserData } from "../utils/api";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";

export const GetUserDataContext = createContext<GetUserDataContextValue>({
  userData: {
    name: "",
    userId: "",
    email: "",
    userWallet: "",
    bio: "",
    followers: [],
    avatarImgUrl: "",
    bannerImgUrl: "",
    twitterUrl: "",
    discordUrl: "",
  },
  collectionData: [],
  allUserDataForFollow: [],
  topArtistsData: [],
  getAllUserLoadingState: false,
  setUserDataFunc: () => {},
  setUserDataChanger: (data: UserDataType) => {},
  getAllUser: async () => {},
  getAllUploadMusic: async () => {},
});

const GetUserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, user } = useDynamicContext();

  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    userId: "",
    email: "",
    userWallet: "",
    bio: "",
    followers: [],
    avatarImgUrl: "",
    bannerImgUrl: "",
    twitterUrl: "",
    discordUrl: "",
  });
  const [collectionData, setCollectionData] = useState<
    Array<collectionDataType>
  >([]);
  const [allUserDataForFollow, setAllUserData] = useState<UserDataType[]>([]);
  const [topArtistsData, setTopArtistsData] = useState<UserDataType[]>([]);
  const [getAllUserLoadingState, setGetAllUserLoadingState] = useState(false);

  const setUserDataFunc = async () => {
    if (user && user.userId) {
      console.log("user", user.userId);
      const userD = await getUserData(user.userId);
      setUserData(userD);
    }
  };

  const setUserDataChanger = (data: UserDataType) => {
    setUserData(data);
    console.log("fewqgqgfffffffffffffffffffffffff", userData);
  };
  const getAllUser = async () => {
    setGetAllUserLoadingState(true);
    const data = await getAllUserData();
    console.log("data======>", data);
    setAllUserData(data);
    setTopArtistsData(data);
    setGetAllUserLoadingState(false);
  };

  const getAllUploadMusic = async () => {
    const musicData = await getMusicData();
    try {
      console.log("musicData =>", musicData[0].metaDataUrl);
      if (musicData[0].metaDataUrl !== "") {
        const res = await fetch(
          process.env.NEXT_PUBLIC_PINATA_URL + musicData[0].metaDataUrl
        );
        const metadata = await res.json();
        collectionData[0] = {
          songArtist: metadata.name,
          songImg: metadata.image,
          songTitle: metadata.description,
          songUrl: metadata.properties.files[0].uri,
          playCount: 0,
        };
        console.log("metadata", collectionData[0].songImg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUser();
    getAllUploadMusic();
  }, [isAuthenticated]);

  useEffect(() => {
    setUserDataFunc();

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isAuthenticated]);

  return (
    <GetUserDataContext.Provider
      value={{
        userData,
        collectionData,
        allUserDataForFollow,
        getAllUserLoadingState,
        topArtistsData,
        setUserDataFunc,
        setUserDataChanger,
        getAllUser,
        getAllUploadMusic,
      }}
    >
      {children}
    </GetUserDataContext.Provider>
  );
};

export default GetUserDataProvider;
