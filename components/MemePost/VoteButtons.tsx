import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { handlePostVote } from "../../utils/handlePostVote";

interface VoteButtonsI {
  likedState: boolean | null;
  userEmail: string | null;
  postHref: number;
  setIsLikedState: Function;
  upvoteCount: number;
  downvoteCount: number;
  liked?: boolean | null;
}

const VoteButtons = ({
  likedState,
  userEmail,
  postHref,
  setIsLikedState,
  upvoteCount,
  downvoteCount,
  liked,
}: VoteButtonsI) => {
  const [upvoteCountState, setUpvoteCountState] = useState(0);
  const [downvoteCountState, setDownvoteCountState] = useState(0);

  useEffect(() => {
    if (downvoteCount) setDownvoteCountState(downvoteCount);
    if (upvoteCount) setUpvoteCountState(upvoteCount);
    if (liked !== undefined) setIsLikedState(liked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        handlePostVote({
          liked: null,
          side: true,
          postId: postHref,
          userEmail: userEmail,
        });
        setUpvoteCountState(upvoteCountState + 1);
        setIsLikedState(true);
      }
    } else {
      toast("You need to login or register to vote!", {
        icon: "🚀",
      });
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
        handlePostVote({
          liked: null,
          side: false,
          postId: postHref,
          userEmail: userEmail,
        });
        setDownvoteCountState(downvoteCountState + 1);
        setIsLikedState(false);
      }
    } else {
      toast("You need to login or register to vote!", {
        icon: "🚀",
      });
    }
  };

  return (
    <>
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
    </>
  );
};

export default VoteButtons;
