import {
  ArrowIcon,
  LikeIcon,
  MiniPlayIcon,
  PlusIcon,
  ReplyIcon,
  RepostIcon,
  ShareIcon,
} from "../../components/Svglist";
import Image from "next/image";
import React from "react";
import { AudioBar } from "./AudioBar";
import { FollowDrop } from "./FollowDrop";

interface PostCardProps {
  posterAvatar: string;
  content: string;
  name: string;
  postedTime: number;
  songImg: string;
  songTitle: string;
  songArtist: string;
  playCount: number;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  songUrl: string;
}
export const PostCard: React.FC<PostCardProps> = ({
  posterAvatar,
  content,
  name,
  postedTime,
  songImg,
  songTitle,
  songArtist,
  playCount,
  replyCount,
  likeCount,
  repostCount,
  songUrl,
}) => {
  return (
    <div className="w-full p-4 flex items-start justify-center flex-col bg-[#161616] rounded-xl gap-4">
      <div className="w-full flex items-center justify-start gap-4">
        <div className="w-[40px] h-[40px] object-cover relative group cursor-pointer">
          <Image fill alt="avatar" src={posterAvatar} className="rounded-xl" />
          <div className="bg-[#272727] rounded-full absolute bottom-[-8px] left-[12px] w-4 h-4 flex items-center justify-center">
            <PlusIcon />
          </div>
          <FollowDrop posterAvatar={posterAvatar} name={name} />
        </div>
        <div className="flex items-start justify-center flex-col">
          <p className="text-white text-lg font-bold">{name}</p>
          <div className="flex items-center justify-center gap-1 text-sm text-[#5E6866] font-bold">
            <span>{`Posted`}</span>
            <li>
              {postedTime} {`h`}
            </li>
          </div>
        </div>
      </div>
      <p className="text-white text-sm text-left">{content}</p>
      <AudioBar
        songTitle={songTitle}
        songImg={songImg}
        playCount={playCount}
        songArtist={songArtist}
        songUrl={songUrl}
      />
      <div className="w-full flex items-center justify-start gap-5 mt-2">
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <ReplyIcon />
          <p className="text-[#5E6866] text-sm font-bold">{replyCount}</p>
        </div>
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <RepostIcon />
          <p className="text-[#5E6866] text-sm font-bold">{repostCount}</p>
        </div>
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <LikeIcon />
          <p className="text-[#5E6866] text-sm font-bold">{likeCount}</p>
        </div>
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <ShareIcon />
        </div>
      </div>
    </div>
  );
};
