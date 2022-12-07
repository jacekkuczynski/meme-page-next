import Image from "next/image";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import UserAvatar from "../UserAvatar/UserAvatar";
import Link from "next/link";
import { handlePostVote } from "../../utils/handlePostVote";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

type MemePostProps = {
  userAvatarURL: string;
  username: string;
  memeTitle: string;
  fileURL: string;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  postHref: number;
  liked: boolean | null;
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
  liked,
}: MemePostProps) => {
  const [upvoteCountState, setUpvoteCountState] = useState(0);
  const [downvoteCountState, setDownvoteCountState] = useState(0);
  const [likedState, setIsLikedState] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<null | string>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    console.log(userEmail);
  }, [userEmail]);

  useEffect(() => {
    if (downvoteCount) setDownvoteCountState(downvoteCount);
    if (upvoteCount) setUpvoteCountState(upvoteCount);
    if (liked !== undefined) setIsLikedState(liked);
  }, [downvoteCount, upvoteCount, liked]);

  const handleUpvote = () => {
    if (userEmail) {
      if (likedState === false) {
        handlePostVote({
          liked: false,
          side: true,
          postId: postHref,
          userEmail: userEmail,
        });
        setUpvoteCountState(upvoteCountState + 1);
        setDownvoteCountState(downvoteCountState - 1);
        setIsLikedState(true);
      } else if (likedState === null) {
        console.log("handleUpvote");
        handlePostVote({
          liked: null,
          side: true,
          postId: postHref,
          userEmail: userEmail,
        });
        setUpvoteCountState(upvoteCountState + 1);
        setIsLikedState(true);
      }
    }
  };
  const handleDownvote = () => {
    if (userEmail) {
      if (likedState === true) {
        handlePostVote({
          liked: true,
          side: false,
          postId: postHref,
          userEmail: userEmail,
        });
        setDownvoteCountState(downvoteCountState + 1);
        setUpvoteCountState(upvoteCountState - 1);
        setIsLikedState(false);
      } else if (likedState === null) {
        console.log("handleDownVote");
        handlePostVote({
          liked: null,
          side: false,
          postId: postHref,
          userEmail: userEmail,
        });
        setDownvoteCountState(downvoteCountState + 1);
        setIsLikedState(false);
      }
    }
  };

  // useEffect(() => {
  //   console.log(likedState);
  // }, [likedState]);

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
            likedState === true
              ? "meme-control-button bg-green-200"
              : "meme-control-button"
          }`}
        >
          <ArrowUpIcon className="h-4 w-4 text-blue-500" />
          <div>{upvoteCountState}</div>
        </button>
        {/* downvote button */}
        <button
          onClick={handleDownvote}
          className={`${
            likedState === false
              ? "meme-control-button bg-red-200"
              : "meme-control-button "
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
