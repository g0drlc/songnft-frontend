import { songMint } from "@/src/utils/mint";
import React, { useRef } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { collectionDataType } from "@/src/types/menu";

interface MintModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: collectionDataType;
}

const MintModal: React.FC<MintModalProps> = ({
  isOpen,
  onRequestClose,
  data,
}) => {
  const wallet = useWallet();

  const onMint = async (data: collectionDataType) => {
    await songMint();
  };

  return (
    <div className="text-white">
      <Modal open={isOpen} onClose={onRequestClose} center>
        <div className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4 sm:p-8 border rounded-lg w-full text-center">
          <h5 className="mb-2 font-bold text-3xl text-gray-900 dark:text-white">
            Mint Song Nft
          </h5>
          <div className="bg-white dark:bg-gray-800 px-5 py-5 rounded-t-lg">
            <label className="font-md sr-only">Your comment</label>
            <textarea
              id="comment"
              rows={7}
              cols={60}
              className="border-0 bg-white dark:bg-gray-800 px-4 py-4 w-full text-gray-900 text-lg focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="sm:flex justify-center items-center rtl:space-x-reverse sm:space-x-4 space-y-4 sm:space-y-0">
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 w-full sm:w-auto focus:ring-4 focus:outline-none focus:ring-gray-300 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:bg-gray-700 px-4 py-2.5 rounded-lg text-white dark:focus:ring-gray-700"
            >
              <div className="text-center">
                <div
                  className="flex justify-center -mt-1 font-sans font-semibold text-xl"
                  onClick={() => (onRequestClose(), onMint(data))}
                >
                  Mint
                </div>
              </div>
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 w-full sm:w-auto focus:ring-4 focus:outline-none focus:ring-gray-300 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:bg-gray-700 px-4 py-2.5 rounded-lg text-white dark:focus:ring-gray-700"
            >
              <div className="text-center">
                <div className="-mt-1 font-sans font-semibold text-xl">
                  Cancel
                </div>
              </div>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MintModal;
