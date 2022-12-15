import axios from "axios";

export const handleGetPostsForInfiniteScroll = async (skipCount: any) => {
  return axios
    .get("/api/getPostsForInfiniteScroll/getPostsForInfiniteScroll", skipCount)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
