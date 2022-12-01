import Image from "next/image";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

import UserAvatar from "../UserAvatar/UserAvatar";
import Link from "next/link";
import { handlePostVote } from "../../utils/handlePostVote";
import { useEffect, useState } from "react";

type MemePostProps = {
  userAvatarURL: string;
  username: string;
  memeTitle: string;
  fileURL: string;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  postHref: number;
};

const MemePost = ({
  userAvatarURL,
  username,
  memeTitle,
  fileURL,
  upvoteCount,
  downvoteCount,
  commentCount,
  postHref,
}: MemePostProps) => {
  const [isVotingActive, setIsVotingActive] = useState(true);

  const handleUpvote = () => {
    if (isVotingActive) handlePostVote({ isUpvote: true, postId: postHref });
    setIsVotingActive(false);
  };
  const handleDownvote = () => {
    if (isVotingActive) handlePostVote({ isUpvote: false, postId: postHref });
    setIsVotingActive(false);
  };

  return (
    <div className="flex flex-col items-center gap-1 w-fit py-5 border-b-2">
      <div className="flex items-center gap-2 text-left w-full text-sm">
        <div className="bg-slate-300 rounded-full p-1">
          {/* avatar */}
          <UserAvatar avatarSrc={userAvatarURL} />
        </div>
        {/* username */}
        <div>{username}</div>
      </div>
      {/* title */}
      <div className="font-semibold text-left text-2xl w-full hover:text-blue-500 cursor-pointer">
        <Link href={`/post/${postHref}`}>
          <h4>{memeTitle}</h4>
        </Link>
      </div>
      {/* meme */}
      <Link href={`/post/${postHref}`}>
        <Image src={fileURL} alt="meme about coding" width={500} height={500} />
      </Link>
      <div className="flex gap-4 w-full mt-2">
        {/* upvote button */}
        <button
          onClick={handleUpvote}
          className={
            isVotingActive
              ? "meme-control-button"
              : "meme-control-button--disabled "
          }
        >
          <ArrowUpIcon className="h-4 w-4 text-blue-500" />
          <div>{upvoteCount}</div>
        </button>
        {/* downvote button */}
        <button
          onClick={handleDownvote}
          className={
            isVotingActive
              ? "meme-control-button"
              : "meme-control-button--disabled "
          }
        >
          <ArrowDownIcon className="h-4 w-4 text-blue-500" />
          <div>{downvoteCount}</div>
        </button>
      </div>
    </div>
  );
};

export default MemePost;

// meme-control-button--disabled
