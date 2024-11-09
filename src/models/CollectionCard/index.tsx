import { AudioBar } from "../PostCard/AudioBar";

interface CollectionCardProps {
  songImg: string;
  songTitle: string;
  songArtist: string;
  playCount: number;
  songUrl: string;
}
export const CollectionCard: React.FC<CollectionCardProps> = ({
  songImg,
  songTitle,
  songArtist,
  playCount,
  songUrl,
}) => {
  return (
    <div className="flex flex-col justify-center items-start gap-4 bg-[#161616] p-4 rounded-xl w-full">
      <AudioBar
        songTitle={songTitle}
        songImg={songImg}
        playCount={playCount}
        songArtist={songArtist}
        songUrl={songUrl}
      />
    </div>
  );
};
