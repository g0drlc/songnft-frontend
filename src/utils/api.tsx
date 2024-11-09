import { FollowersType, UserDataType } from "../types/menu";
import axios from "axios";

export async function createUserData(userData: UserDataType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/users/create`,
      {
        userData: userData,
      }
    );
    return response?.data;
  } catch (err) {
    console.log("verify email err = ", err);
  }
}

export async function followUnfollow(
  followerData: FollowersType,
  userWallet: string
) {
  console.log("followerData", followerData);
  console.log("userWallet", userWallet);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/users/follow`,
      {
        followerData: followerData,
        userWallet: userWallet,
      }
    );
    return response?.data;
  } catch (err) {
    console.log("verify email err = ", err);
  }
}

export async function getUserData(userId: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/users/${userId}`
    );

    console.log("response?.data", response?.data);
    return response?.data;
  } catch (err) {
    console.log("verify email err = ", err);
  }
}

export async function getAllUserData() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/users/`
    );

    console.log("response?.data", response?.data);
    return response?.data;
  } catch (err) {
    console.log("verify email err = ", err);
  }
}

export async function getMusicData() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/music/profile`
    );
    console.log("getuplaoad", response);
    return response?.data;
  } catch (err) {
    console.log("upload error = ", err);
  }
}
export async function createMusic(userWallet: string, metaDataUrl: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/music/create`,
      {
        userWallet: userWallet,
        metaDataUrl: metaDataUrl,
      }
    );
    return response?.data;
  } catch (err) {
    console.log("verify email err = ", err);
  }
}
