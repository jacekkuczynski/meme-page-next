import axios from "axios";

interface handlePostVoteI {
  liked: boolean | null;
  postId: number;
  userEmail: string;
  side: boolean;
}

export const handlePostVote = async ({
  liked,
  postId,
  userEmail,
  side,
}: handlePostVoteI) => {
  if (liked === false && side === true) {
    axios
      .post("/api/postVoting/upVoteFromDownVote", { postId, userEmail })
      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  } else if (liked === null && side === true) {
    axios
      .post("/api/postVoting/upVoteFromNull", { postId, userEmail })
      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  } else if (liked === true && side === false) {
    axios
      .post("/api/postVoting/downVoteFromUpVote", { postId, userEmail })
      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  } else if (liked === null && side === false) {
    axios

      .post("/api/postVoting/downVoteFromNull", { postId, userEmail })

      .then((res) => {})
      .catch((err) => {
        console.log("something went wrong...", err);
      });
  }
};
