import Image from "next/image";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import UserAvatar from "../UserAvatar/UserAvatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import VoteButtons from "./VoteButtons";

type MemePostProps = {
  userAvatarURL: string;
  username: string;
  memeTitle: string;
  fileURL: string;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  postHref: number;
  liked?: boolean | null;
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
  const [likedState, setIsLikedState] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<null | string>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, [user]);

  const setIsLikedStateHandler = (data: boolean) => {
    setIsLikedState(data);
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
        <VoteButtons
          likedState={likedState}
          userEmail={userEmail}
          postHref={postHref}
          setIsLikedState={setIsLikedStateHandler}
          upvoteCount={upvoteCount}
          downvoteCount={downvoteCount}
          liked={liked}
        />
        <Link href={`/post/${postHref}`}>
          <button className="meme-control-button">
            <ChatBubbleLeftIcon className="h-4 w-4 text-blue-500" />
            <div>{commentCount}</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MemePost;
