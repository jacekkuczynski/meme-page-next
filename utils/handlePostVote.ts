import axios from "axios";

interface handlePostVoteI {
  liked: boolean | null;
  postId: number;
  side: boolean;
}

export const handlePostVote = async ({
  liked,
  postId,
  side,
}: handlePostVoteI) => {
  if (liked === false && side === true) {
    axios
      .post("/api/postVoting/upVoteFromDownVote", { postId })
      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  } else if (liked === null && side === true) {
    axios
      .post("/api/postVoting/upVoteFromNull", { postId })
      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  } else if (liked === true && side === false) {
    axios
      .post("/api/postVoting/downVoteFromUpVote", { postId })
      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  } else if (liked === null && side === false) {
    axios
      .post("/api/postVoting/downVoteFromNull", { postId })
      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  }
};
