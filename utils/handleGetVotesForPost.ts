import axios from "axios";

interface handleGetVotesForPostI {
  postId: number;
  userEmail: string;
}

export const handleGetVotesForPost = async ({
  postId,
  userEmail,
}: handleGetVotesForPostI) => {
  const params = { postId, userEmail };

  return axios
    .post("/api/getVotesForPost/getVotesForPost", params)
    .then((res) => {
      console.log(res);
      return res.data.votesForPost;
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
