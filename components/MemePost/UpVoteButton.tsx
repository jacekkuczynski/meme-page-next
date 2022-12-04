import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { handlePostVote } from "../../utils/handlePostVote";

interface UpVoteButtonI {
  postHref: number;
  upvoteCount: number;
  isLiked: boolean;
  isDisliked: boolean;
  handleLikeChange: Function;
}

const UpVoteButton = ({
  postHref,
  isLiked,
  isDisliked,
  handleLikeChange,
  upvoteCount,
}: UpVoteButtonI) => {
  const [upvoteCountState, setupvoteCountState] = useState(0);

  useEffect(() => {
    setupvoteCountState(upvoteCount);
  }, [upvoteCount]);

  const handleUpvote = () => {
    if ((!isLiked && !isDisliked) || (!isLiked && isDisliked)) {
      handlePostVote({ isUpvote: true, postId: postHref });
      console.log("upVoted");
      setupvoteCountState(upvoteCountState + 1);
      handleLikeChange();
    }
  };

  return (
    <button onClick={handleUpvote} className={"meme-control-button"}>
      <ArrowDownIcon className="h-4 w-4 text-blue-500" />
      <div>{upvoteCountState}</div>
    </button>
  );
};

export default UpVoteButton;
