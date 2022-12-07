import axios from "axios";

export const handleGetPostsToDisplay = async () => {
  return axios
    .get("/api/getPostsToDisplay/getPostsToDisplay")
    .then((res) => {
      return res.data.postsToDisplay;
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
