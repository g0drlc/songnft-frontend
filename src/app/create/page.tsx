"use client";
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ChangeIcon } from "../../components/Svglist";
import SearchBar from "../../components/SearchBar";
import { WaveSpinner } from "react-spinners-kit";
import {
  errorAlert,
  successAlert,
  warningAlert,
} from "@/src/components/ToastGroup";
import { NFTMetaDataType } from "@/src/types/menu";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";
import { createMusic } from "@/src/utils/api";

const Create: NextPage = () => {
  const { userData } = useContext(GetUserDataContext);
  const hiddenMusicImg = useRef(null);
  const uploadedMusicImg = useRef(null);

  const router = useRouter();

  const { isAuthenticated } = useDynamicContext();
  const [selectedMusicImg, setSelectedMusicImg] = useState<any>(null);
  const [selectedMusicSrc, setSelectedMusicSrc] = useState<any>(null);
  const [musicTitle, setMusicTitle] = useState("");
  const [musicDescription, setMusicDescription] = useState("");
  const [funcLoadingState, setFuncLoadingState] = useState(false);

  const redirectIfNotAuthenticated = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isAuthenticated]);

  useEffect(() => {
    redirectIfNotAuthenticated();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [redirectIfNotAuthenticated]);

  const handleMusicImgChange = (event: any): void => {
    const fileUploaded: File = event.target.files[0];
    if (fileUploaded) {
      const reader: FileReader = new FileReader();
      const { current }: any = uploadedMusicImg;
      current.fileUploaded = fileUploaded;
      setSelectedMusicImg(fileUploaded);
      console.log("fileupload", fileUploaded);
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        current.src = e.target?.result as string;
      };
      reader.readAsDataURL(fileUploaded);
    }
  };

  const handleMusicSrcChange = (event: any): void => {
    const fileUploaded: File = event.target.files[0];
    if (fileUploaded) {
      const reader: FileReader = new FileReader();
      const { current }: any = uploadedMusicImg;
      current.fileUploaded = fileUploaded;
      setSelectedMusicSrc(fileUploaded);
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        current.src = e.target?.result as string;
      };
      reader.readAsDataURL(fileUploaded);
    }
  };

  const handleMusicImgAdd = () => {
    if (hiddenMusicImg.current) {
      (hiddenMusicImg.current as HTMLInputElement).click();
    }
  };

  const saveMusicData = async () => {
    if (selectedMusicImg && selectedMusicSrc) {
      try {
        // Save the avatar
        const musicImgData = new FormData();
        musicImgData.append("file", selectedMusicImg);
        const musicImgRes = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_APIKEY}`,
            },
            body: musicImgData,
          }
        );
        const musicImgResData = await musicImgRes.json();

        // Save the banner
        const musicSrcData = new FormData();
        musicSrcData.append("file", selectedMusicSrc);
        const musicSrcRes = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_APIKEY}`,
            },
            body: musicSrcData,
          }
        );
        const musicSrcResData = await musicSrcRes.json();

        // Return the uploaded URLs
        return {
          musicImgUrl: musicImgResData.IpfsHash,
          musicSrcUrl: musicSrcResData.IpfsHash,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  const handleMusicUploadFunc = async () => {
    if (
      selectedMusicImg &&
      selectedMusicSrc &&
      musicTitle !== "" &&
      musicDescription !== ""
    ) {
      setFuncLoadingState(true);
      const data = await saveMusicData();
      console.log("data=================>", data);
      const uploadedJsonUrl = await uploadJsonToPinata({
        name: musicTitle,
        symbol: "SONG",
        description: musicDescription,
        seller_fee_basis_points: 100,
        external_url: "https://songnft.xyz",
        attributes: [
          {
            trait_type: "Artist",
            value: userData.name,
          },
          {
            trait_type: "Posting Date",
            value: new Date().toDateString(),
          },
          {
            trait_type: "License",
            value: "Exclusive",
          },
        ],
        image: process.env.NEXT_PUBLIC_PINATA_URL + data?.musicImgUrl,
        properties: {
          files: [
            {
              type: "audio/mp3",
              uri: process.env.NEXT_PUBLIC_PINATA_URL + data?.musicSrcUrl,
            },
            {
              type: "image/png",
              uri: process.env.NEXT_PUBLIC_PINATA_URL + data?.musicImgUrl,
            },
          ],
          category: "audio",
        },
      });

      try {
        const result = await createMusic(userData.userWallet, uploadedJsonUrl);
        if (result.type === "success") {
          successAlert("Uploaded music successfully.");
          setFuncLoadingState(false);
        } else {
          errorAlert("Something went wrong.");
          setFuncLoadingState(false);
        }
      } catch (error) {
        console.log("error ====>", error);
        setFuncLoadingState(false);
        errorAlert("Something went wrong.");
      }
    } else {
      warningAlert("Please input all.");
    }
  };

  const uploadJsonToPinata = async (jsonData: NFTMetaDataType) => {
    try {
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            // Replace YOUR_PINATA_JWT with your actual JWT token
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_APIKEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pinataContent: jsonData,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Uploaded JSON hash:", data.IpfsHash);
      return data.IpfsHash;
    } catch (error) {
      console.error("Error uploading JSON to Pinata:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full lg:ml-[250px] lg:mt-0 relative overflow-hidden flex-col">
        <div className="w-full relative">
          <div className="absolute z-[9999] left-[100px] top-4 right-0 flex items-center justify-center">
            <SearchBar />
          </div>
          <div className="w-full h-[280px] relative">
            <Image src={"/imgs/banners/banner2.png"} fill alt="Banner" />
          </div>
        </div>
        <div className="w-full flex items-start justify-center px-5 -mt-[100px] z-[9993]">
          <div className="2xl:w-[1040px] xl:w-[900px] lg:w-[700px] w-full p-6 bg-[#161616] rounded-xl mt-10 lg:mb-[150px] mb-[200px]">
            <h1 className="text-white font-bold text-xl">{`Create Sound`}</h1>
            <div className="w-full flex lg:flex-row flex-col items-start justify-center mt-5">
              <div className="md:w-[300px] w-full flex items-start justify-center flex-col gap-2">
                <div className="md:w-[300px] w-full flex items-start justify-center flex-col gap-2">
                  <p className="text-sm font-bold text-white">{`Song Upload File`}</p>
                  <div className="relative">
                    <div className="w-[90%] relative">
                      <input
                        className="border-[#2C2C2C] border-[1px] w-full bg-[#000000] text-white py-2 px-4 rounded-full hover:bg-[#000000ee] focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
                        accept="audio/*"
                        type="file"
                        name="myMusicSrc"
                        onChange={(e) => handleMusicSrcChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-bold  text-white">{`Song Image`}</p>
                <div className="relative">
                  <div className="w-[140px] h-[140px] relative">
                    <img
                      ref={uploadedMusicImg}
                      src={
                        selectedMusicImg
                          ? selectedMusicImg
                          : "/imgs/avatars/avatar2.png"
                      }
                      alt="Profile Avatar"
                      className="object-cover rounded-2xl border-4 border-black"
                    />
                    <input
                      style={{ display: "none" }}
                      accept="image/*"
                      type="file"
                      name="myImage"
                      ref={hiddenMusicImg}
                      onChange={(e) => handleMusicImgChange(e)}
                      defaultValue=""
                    />
                  </div>
                  <div
                    className="rounded-xl bg-[#161616] w-[36px] h-[36px] flex items-center justify-center p-1 absolute bottom-3 right-3 cursor-pointer"
                    onClick={handleMusicImgAdd}
                  >
                    <ChangeIcon width={25} height={25} />
                  </div>
                </div>
              </div>
              <div className="lg:w-[calc(100%-300px)] w-full lg:pl-[50px] pl-[30px] mt-5 lg:mt-0">
                <p className="text-sm font-bold text-white">{`Song Title`}</p>
                <div className="bg-black rounded-full border-[#2C2C2C] border-[1px] px-3 py-2 w-full z-50 mt-4">
                  <input
                    className="w-full outline-none bg-transparent placeholder:text-[#5E6866] text-white z-50 placeholder:text-sm"
                    placeholder="Irvan Wibowo"
                    onChange={(e) => setMusicTitle(e.target.value)}
                  />
                </div>
                <p className="text-sm font-bold text-white mt-5">{`Description`}</p>
                <div className="bg-black rounded-xl border-[#2C2C2C] border-[1px] px-3 py-2 w-full z-50 mt-4">
                  <textarea
                    className="w-full outline-none bg-transparent h-[130px] placeholder:text-[#5E6866] placeholder:text-sm text-white z-50"
                    placeholder="New songs is out now, Interdimensional Frequency Sculptor | 432 Hz Conscious Electronic Music | 
                Música W3 Co-Founder "
                    onChange={(e) => setMusicDescription(e.target.value)}
                  />
                </div>
                <div className="w-full flex items-center justify-end gap-4 py-4 mt-5 border-t-[1px] border-[#2C2C2C]">
                  <Link href={"/profile"}>
                    <div className="text-white text-sm rounded-full border-[1px] border-[#0cdee4] px-3 py-2 duration-300 transition-all hover:bg-[#000000] cursor-pointer">
                      {`Go to profile`}
                    </div>
                  </Link>
                  <div
                    className="text-black font-bold text-sm rounded-full bg-[#0cdee4] px-3 py-2 duration-300 transition-all hover:bg-[#0cdee4b6] cursor-pointer"
                    onClick={handleMusicUploadFunc}
                  >
                    {`+ Create`}
                  </div>
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

export default Create;
