import axios from "axios";

export const handleGetVotesForPost = async (params: any) => {
  return axios
    .get("/api/getVotesForPost/getVotesForPost", params)
    .then((res) => {
      return res.data.votesForPost;
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
