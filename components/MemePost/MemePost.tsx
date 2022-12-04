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
  isLiked: boolean;
  isDisliked: boolean;
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
  isLiked,
  isDisliked,
}: MemePostProps) => {
  const [upvoteCountCountState, setUpvoteCountCountState] = useState(0);
  const [downvoteCountState, setDownvoteCountState] = useState(0);
  const [isLikedState, setIsLikedState] = useState<boolean | null>(null);
  const [isDislikedState, setIsDislikedState] = useState<boolean | null>(null);

  console.log("render");

  useEffect(() => {
    if (downvoteCount) setDownvoteCountState(downvoteCount);
    if (upvoteCount) setUpvoteCountCountState(upvoteCount);
    if (isLiked) setIsLikedState(isLiked);
    if (isDisliked) setIsDislikedState(isDisliked);
  }, [downvoteCount, upvoteCount, isLiked, isDisliked]);

  const handleUpvote = () => {
    if (
      (!isLikedState && !isDislikedState) ||
      (!isLikedState && isDislikedState)
    ) {
      handlePostVote({ isUpvote: true, postId: postHref });
      console.log("upVoted");
      if (isDislikedState && !isLikedState) {
        setUpvoteCountCountState(upvoteCountCountState + 1);
        setDownvoteCountState(downvoteCountState - 1);
      } else if (!isDislikedState && !isLikedState)
        setUpvoteCountCountState(upvoteCountCountState + 1);
      setIsLikedState(true);
      setIsDislikedState(false);
    }
  };
  const handleDownvote = () => {
    if (
      (!isLikedState && !isDislikedState) ||
      (isLikedState && !isDislikedState)
    ) {
      handlePostVote({ isUpvote: false, postId: postHref });

      console.log("downVoted");
      if (!isDislikedState && isLikedState) {
        setDownvoteCountState(downvoteCountState + 1);
        setUpvoteCountCountState(upvoteCountCountState - 1);
      } else if (!isDislikedState && !isLikedState)
        setDownvoteCountState(downvoteCountState + 1);
      setIsDislikedState(true);
      setIsLikedState(false);
    }
  };

  useEffect(() => {
    console.log(isLikedState);
    console.log(isDislikedState);
  }, [isDislikedState, isLikedState]);
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
          className={`${
            isLikedState
              ? "meme-control-button--disabled"
              : "meme-control-button"
          }`}
        >
          <ArrowUpIcon className="h-4 w-4 text-blue-500" />
          <div>{upvoteCountCountState}</div>
        </button>
        {/* downvote button */}
        <button
          onClick={handleDownvote}
          className={`${
            isDislikedState
              ? "meme-control-button--disabled"
              : "meme-control-button"
          }`}
        >
          <ArrowDownIcon className="h-4 w-4 text-blue-500" />
          <div>{downvoteCountState}</div>
        </button>
      </div>
    </div>
  );
};

export default MemePost;

// meme-control-button--disabled
