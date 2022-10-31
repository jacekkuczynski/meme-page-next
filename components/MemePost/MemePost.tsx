import Image from "next/image";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

import UserAvatar from "../UserAvatar/UserAvatar";


type MemePostProps = {
  userAvatarSrc: string;
  username: string;
  imageTitle: string;
  imageSrc: string;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
};

const MemePost = ({
  userAvatarSrc,
  username,
  imageTitle,
  imageSrc,
  upvoteCount,
  downvoteCount,
  commentCount,
}: MemePostProps) => {
  return (
    <div className="flex flex-col items-center gap-1 w-fit py-5 border-b-2">
      <div className="flex items-center gap-2 text-left w-full text-sm">

        <div className="bg-slate-300 rounded-full p-1">
          {/* avatar */}
          <UserAvatar avatarSrc={"/avatarExample.png"} />

        </div>
        {/* username */}
        <div>username</div>
      </div>
      {/* title */}

      <h4 className="font-semibold text-left text-2xl w-full hover:text-blue-500 cursor-pointer">
        Meme Title
      </h4>

      {/* meme */}
      <Image
        src={"/memeExample.webp"}
        alt="meme about coding"
        width={500}
        height={500}
      />
      <div className="flex gap-4 w-full mt-2">
        {/* upvote button */}
        <div className="meme-control-button">
          <ArrowUpIcon className="h-4 w-4 text-blue-500" />
          <div>419</div>
        </div>
        {/* downvote button */}
        <div className="meme-control-button">
          <ArrowDownIcon className="h-4 w-4 text-blue-500" />
          <div>68</div>
        </div>
        {/* comment button */}
        <div className="meme-control-button">
          <ChatBubbleLeftIcon className="h-4 w-4 text-blue-500" />
          <div>68</div>
        </div>
      </div>
    </div>
  );
};

export default MemePost;
