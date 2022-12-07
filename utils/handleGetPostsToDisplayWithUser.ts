import axios from "axios";

export const handleGetPostsToDisplayWithUser = async () => {
  return axios
    .get("/api/getPostsToDisplayWithUser/getPostsToDisplayWithUser")
    .then((res) => {
      return res.data.postsToDisplayWithUser;
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
