import axios from "axios";

interface handlePostVoteI {
  isUpvote: boolean;
  postId: number;
}

export const handlePostVote = async ({ isUpvote, postId }: handlePostVoteI) => {
  if (isUpvote === true) {
    axios
      .post("/api/upVotePost/upVotePost", { postId })
      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  } else {
    axios
      .post("/api/downVotePost/downVotePost", { postId })
      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  }
};
