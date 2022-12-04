import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { handlePostVote } from "../../utils/handlePostVote";

interface DownVoteButtonI {
  postHref: number;
  downvoteCount: number;
  isLiked: boolean;
  isDisliked: boolean;
  handleDislikeChange: Function;
}

const DownVoteButton = ({
  postHref,
  isLiked,
  isDisliked,
  handleDislikeChange,
  downvoteCount,
}: DownVoteButtonI) => {
  const [downvoteCountState, setDownvoteCountState] = useState(0);

  console.log("rerender");

  useEffect(() => {
    console.log(isLiked, "isLiked");
    console.log(isDisliked, "isDisliked");
  }, [isLiked, isDisliked]);

  useEffect(() => {
    setDownvoteCountState(downvoteCount);
  }, [downvoteCount]);

  const handleDownvote = () => {
    if ((!isLiked && !isDisliked) || (isLiked && !isDisliked)) {
      handlePostVote({ isUpvote: false, postId: postHref });

      console.log("downVoted");
      setDownvoteCountState(downvoteCountState + 1);
      handleDislikeChange();
    }
  };

  return (
    <button onClick={handleDownvote} className={"meme-control-button"}>
      <ArrowDownIcon className="h-4 w-4 text-blue-500" />
      <div>{downvoteCountState}</div>
    </button>
  );
};

export default DownVoteButton;
