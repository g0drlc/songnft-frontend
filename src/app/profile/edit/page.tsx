"use client";
/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  ArrowIcon,
  ChangeIcon,
  EmailSettingIcon,
  MyEarningsIcon,
  ProfileSettingicon,
} from "../../../components/Svglist";
import SearchBar from "../../../components/SearchBar";
import { WaveSpinner } from "react-spinners-kit";
import { UserDataType } from "../../../types/menu";
import { createUserData } from "../../../utils/api";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";
import { successAlert } from "@/src/components/ToastGroup";

const Edit: NextPage = () => {
  const { user, isAuthenticated } = useDynamicContext();
  const router = useRouter();
  const { userData, setUserDataFunc } = useContext(GetUserDataContext);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const uploadedAvatarImg = useRef(null);
  const hiddenAvatarInput = useRef(null);
  const hiddenBannerInput = useRef(null);
  const uploadedBannerImg = useRef(null);

  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [canSave, setCanSave] = useState(true);
  const [funcLoadingState, setFuncLoadingState] = useState(false);
  const [selectedAvatarImg, setSelectedAvatarImg] = useState<any>(null);
  const [selectedBannerImg, setSelectedBannerImg] = useState<any>(null);

  const handleAvatarAdd = () => {
    if (hiddenAvatarInput.current) {
      (hiddenAvatarInput.current as HTMLInputElement).click();
    }
  };

  const handleAvatarChange = (event: any): void => {
    const fileUploaded: File = event.target.files[0];
    if (fileUploaded) {
      const reader: FileReader = new FileReader();
      const { current }: any = uploadedAvatarImg;
      current.fileUploaded = fileUploaded;
      setSelectedAvatarImg(fileUploaded);
      console.log("fileupload", fileUploaded);
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        current.src = e.target?.result as string;
      };
      reader.readAsDataURL(fileUploaded);
    }
  };

  const handleBannerAdd = () => {
    if (hiddenBannerInput.current) {
      (hiddenBannerInput.current as HTMLInputElement).click();
    }
  };

  const handleBannerChange = (event: any): void => {
    const fileUploaded: File = event.target.files[0];
    if (fileUploaded) {
      const reader: FileReader = new FileReader();
      const { current }: any = uploadedBannerImg;
      current.fileUploaded = fileUploaded;
      setSelectedBannerImg(fileUploaded);
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        current.src = e.target?.result as string;
      };
      reader.readAsDataURL(fileUploaded);
    }
  };

  const saveProfileImgData = async () => {
    if (selectedAvatarImg && selectedBannerImg) {
      try {
        // Save the avatar
        const avatarData = new FormData();
        avatarData.append("file", selectedAvatarImg);
        const avatarRes = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_APIKEY}`,
            },
            body: avatarData,
          }
        );
        const avatarResData = await avatarRes.json();

        // Save the banner
        const bannerData = new FormData();
        bannerData.append("file", selectedBannerImg);
        const bannerRes = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_APIKEY}`,
            },
            body: bannerData,
          }
        );
        const bannerResData = await bannerRes.json();

        // Return the uploaded URLs
        return {
          avatarUrl: avatarResData.IpfsHash,
          bannerUrl: bannerResData.IpfsHash,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else if (selectedAvatarImg && !selectedBannerImg) {
      try {
        // Save the avatar
        const avatarData = new FormData();
        avatarData.append("file", selectedAvatarImg);
        const avatarRes = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_APIKEY}`,
            },
            body: avatarData,
          }
        );
        const avatarResData = await avatarRes.json();
        console.log("Avatar resData", avatarResData);

        // Return the uploaded URLs
        return {
          avatarUrl: avatarResData.IpfsHash,
          bannerUrl: userData.bannerImgUrl,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else if (!selectedAvatarImg && selectedBannerImg) {
      try {
        // Save the banner
        const bannerData = new FormData();
        bannerData.append("file", selectedBannerImg);
        const bannerRes = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_APIKEY}`,
            },
            body: bannerData,
          }
        );
        const bannerResData = await bannerRes.json();
        console.log("Banner resData", bannerResData);

        // Return the uploaded URLs
        return {
          avatarUrl: userData.avatarImgUrl,
          bannerUrl: bannerResData.IpfsHash,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      return {
        avatarUrl: userData.avatarImgUrl,
        bannerUrl: userData.bannerImgUrl,
      };
    }
  };

  const handleSaveUserData = async () => {
    if (userName === "") {
      setCanSave(false);
    } else {
      setFuncLoadingState(true);
      const data = await saveProfileImgData();
      console.log("avatarUrl ====>", data.avatarUrl);
      console.log("avatarUrl ====>", data.bannerUrl);

      const dataToSave: UserDataType = {
        name: userName,
        userId: user?.userId!,
        email: user?.email!,
        userWallet: user?.verifiedCredentials[0].address!,
        bio: userBio === "" ? userData.bio : userBio,
        followers: [],
        avatarImgUrl: data.avatarUrl,
        bannerImgUrl: data.bannerUrl,
        twitterUrl: twitterUrl,
        discordUrl: discordUrl,
      };

      try {
        const result = await createUserData(dataToSave);
        if (result.type === "success") {
          console.log("success");
          setFuncLoadingState(false);
          successAlert("Success");
          setUserDataFunc();
        }
        console.log("result ========>", result);
      } catch (error) {
        console.log("Create UserData Err =>", error);
        setFuncLoadingState(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full lg:ml-[250px] ml-0 relative overflow-hidden flex-col lg:p-[50px] px-[20px] gap-4 mt-[100px] lg:mt-0 mb-[180px]">
        <div className="2xl:w-[1140px] xl:w-[900px] lg:w-[750px] w-full flex items-center justify-between">
          <SearchBar />
          <Link href={"/profile"}></Link>
        </div>
        <div className="2xl:w-[1140px] xl:w-[900px] lg:w-[750px] w-full flex items-center justify-between gap-2">
          <div className="flex items-center justify-center gap-2">
            <div className="text-white rounded-full border-[1px] border-[#2C2C2C] bg-[#161616] py-2 px-4 flex items-center justify-center gap-3 cursor-pointer">
              <ProfileSettingicon />
              <p className="text-sm md:text-md">{`Profile`}</p>
            </div>
            <div className="text-[#5E6866] py-2 px-4 flex items-center justify-center gap-3 cursor-pointer">
              <EmailSettingIcon />
              <p className="text-sm md:text-md">{`Email`}</p>
            </div>
            <div className="text-[#5E6866] py-2 px-4 flex items-center justify-center gap-3 cursor-pointer">
              <MyEarningsIcon />
              <p className="text-sm md:text-md">{`Earnings`}</p>
            </div>
          </div>
          <div
            className="text-white rounded-full border-[1px] border-[#2C2C2C] bg-[#161616] py-2 px-4 flex items-center justify-center gap-3 cursor-pointer
           duration-300 transition-all hover:bg-[#afafaf10]"
          >
            <div className="rotate-90">
              <ArrowIcon />
            </div>
            <p>{`Back`}</p>
          </div>
        </div>
        <div className="2xl:w-[1140px] xl:w-[900px] lg:w-[750px] w-full p-6 bg-[#161616] rounded-xl">
          <h1 className="text-white font-bold text-xl">{`Profile Settings`}</h1>
          <div className="w-full flex lg:flex-row flex-col items-start justify-center mt-5">
            <div className="md:w-[300px] w-full flex items-start justify-center flex-col gap-2">
              <p className="text-md font-normal text-white">{`Avatar`}</p>
              <div className="relative w-[140px] h-[140px] rounded-2xl border-4 border-black flex items-center justify-center">
                <div className="w-[140px] h-[130px] relative flex items-center justify-center ">
                  <img
                    ref={uploadedAvatarImg}
                    src={
                      selectedAvatarImg
                        ? selectedAvatarImg
                        : userData.avatarImgUrl === ""
                        ? "/imgs/avatars/initialAvatar.png"
                        : process.env.NEXT_PUBLIC_PINATA_URL +
                          userData.avatarImgUrl
                    }
                    alt="Profile Avatar"
                    className="object-cover rounded-2xl w-full h-full"
                  />
                  {/* {selectedAvatarImg === null && (
                  <p className="text-[#f7f7f77c] text-center text-sm">{`No Image.`}</p>
                )} */}
                  <input
                    style={{ display: "none" }}
                    accept="image/*"
                    type="file"
                    name="myImage"
                    ref={hiddenAvatarInput}
                    onChange={handleAvatarChange}
                    defaultValue=""
                  />
                </div>
                <div
                  className="rounded-xl bg-[#161616] w-[36px] h-[36px] flex items-center justify-center p-1 absolute bottom-3 right-3 cursor-pointer"
                  onClick={() => handleAvatarAdd()}
                >
                  <ChangeIcon width={25} height={25} />
                </div>
              </div>
              <span className="text-[#5E6866] text-sm">{`*Max 2mb (.jpg, .png, .gif) 800x800px recommeded`}</span>
              <p className="text-md font-normal text-white mt-5">{`Cover`}</p>
              <div className="relative">
                <div className="w-[300px] h-[140px] relative">
                  <img
                    ref={uploadedBannerImg}
                    src={
                      selectedBannerImg
                        ? selectedBannerImg
                        : userData.bannerImgUrl === ""
                        ? "/imgs/banners/banner2.png"
                        : process.env.NEXT_PUBLIC_PINATA_URL +
                          userData.bannerImgUrl
                    }
                    alt="Profile Avatar"
                    className="object-cover rounded-2xl border-4 border-black w-full h-full"
                  />
                  <input
                    style={{ display: "none" }}
                    accept="image/*"
                    type="file"
                    name="myImage"
                    ref={hiddenBannerInput}
                    onChange={handleBannerChange}
                    defaultValue=""
                  />
                </div>
                <div
                  className="rounded-xl bg-[#161616] w-[36px] h-[36px] flex items-center justify-center p-1 absolute bottom-3 right-3 cursor-pointer"
                  onClick={() => handleBannerAdd()}
                >
                  <ChangeIcon width={25} height={25} />
                </div>
              </div>
              <span className="text-[#5E6866] text-sm">{`Max 10 MB. (.jpg, .png, .gif) 1920 x640px recommended`}</span>
            </div>
            <div className="lg:w-[calc(100%-300px)] w-full lg:pl-[50px] md:pl:[30px] mt-5 lg:mt-0">
              <p className="text-md font-normal text-white">{`Display Name`}</p>
              <div className="bg-black rounded-full border-[#2C2C2C] border-[1px] px-3 py-2 w-full z-50 mt-4">
                <input
                  className="w-full outline-none bg-transparent placeholder:text-[#5E6866] text-white z-50 placeholder:text-sm text-sm"
                  placeholder="Irvan Wibowo"
                  onChange={(e) => {
                    setCanSave(true);
                    setUserName(e.target.value);
                    e.target.value === "" && setCanSave(false);
                  }}
                />
              </div>
              <p
                className={`text-[13px] ml-4 font-normal text-red-400 ${
                  canSave ? "hidden" : "block"
                }`}
              >{`Display name cannot be empty`}</p>

              <p className="text-md font-normal text-white mt-5">{`Bio`}</p>
              <div className="bg-black rounded-xl border-[#2C2C2C] border-[1px] px-3 py-2 w-full z-50 mt-4">
                <textarea
                  className="w-full outline-none bg-transparent max-h-[230px] h-[130px] placeholder:text-[#5E6866] text-white z-50 placeholder:text-sm text-sm"
                  placeholder="New songs is out now, Interdimensional Frequency Sculptor | 432 Hz Conscious Electronic Music | 
                Musica W3 Co-Founder."
                  onChange={(e) => setUserBio(e.target.value)}
                />
              </div>
              {/* <div className="w-full flex items-center gap-5 mt-5">
              <div className="flex items-start justify-start flex-col gap-2 w-1/2">
                <p className="text-white text-md">{`Invited By`}</p>
                <div className="bg-black rounded-full border-[#2C2C2C] border-[1px] px-3 py-2 w-full z-50">
                  <input
                    className="w-full outline-none bg-transparent placeholder:text-[#5E6866] text-white z-50"
                    placeholder="Find user"
                  />
                </div>
              </div>
              <div className="flex items-start justify-start flex-col gap-2 w-1/2">
                <p className="text-white text-md">{`Location`}</p>
                <div className="bg-black rounded-full border-[#2C2C2C] border-[1px] px-3 py-2 w-full z-50">
                  <input
                    className="w-full outline-none bg-transparent placeholder:text-[#5E6866] text-white z-50"
                    placeholder="Find Location"
                  />
                </div>
              </div>
            </div> */}
              <div className="flex items-start justify-start flex-col gap-2 w-full mt-5">
                <p className="text-white text-md">{`Twitter URL`}</p>
                <div className="bg-black rounded-full border-[#2C2C2C] border-[1px] px-3 py-2 w-full z-50">
                  <input
                    className="w-full outline-none bg-transparent placeholder:text-[#5E6866] text-white z-50 placeholder:text-sm text-sm"
                    placeholder="e.g. htttps://twitter.com/audiomoods"
                    onChange={(e) => setTwitterUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-start justify-start flex-col gap-2 w-full mt-5">
                <p className="text-white text-md">{`Discord URL`}</p>
                <div className="bg-black rounded-full border-[#2C2C2C] border-[1px] px-3 py-2 w-full z-50">
                  <input
                    className="w-full outline-none bg-transparent placeholder:text-[#5E6866] text-white z-50 placeholder:text-sm text-sm"
                    placeholder="e.g. htttps://t.me/@audiomoods"
                    onChange={(e) => setDiscordUrl(e.target.value)}
                  />
                </div>
              </div>
              {/* <div className="flex items-start justify-start flex-col gap-2 w-full mt-5">
                <p className="text-white text-md">{`Tiktok URL`}</p>
                <div className="bg-black rounded-full border-[#2C2C2C] border-[1px] px-3 py-2 w-full z-50">
                  <input
                    className="w-full outline-none bg-transparent placeholder:text-[#5E6866] text-white z-50"
                    placeholder="e.g. 0x873asfwaSd212topugd9t9t31r21s97dta9sd0asd8dtn0pw3jtn9dmheudsoa..."
                  />
                </div>
              </div> */}
              {/* <p className="text-[#5E6866] mt-2">{`Presale access will be transerred yto your delegate wallet when your primary wallet address is added to an allowlist.`}</p> */}
              <div className="w-full flex items-center justify-end gap-4 py-4 mt-5 border-t-[1px] border-[#2C2C2C]">
                <Link href={"/profile"}>
                  <div className="text-white text-sm rounded-full border-[1px] border-[#0cdee4] px-3 py-2 duration-300 transition-all hover:bg-[#000000] cursor-pointer">
                    {`Go to profile`}
                  </div>
                </Link>
                <div
                  className="text-black text-sm rounded-full bg-[#0cdee4] px-3 py-2 duration-300 transition-all hover:bg-[#0cdde4c9] cursor-pointer font-bold"
                  onClick={handleSaveUserData}
                >
                  {`Save Changes`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {funcLoadingState && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-md z-[9999]">
          <WaveSpinner />
        </div>
      )}
    </>
  );
};

export default Edit;
