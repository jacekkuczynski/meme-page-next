import axios from "axios";

type addedCommentType = {
  commentContent: string;
  postId: number;
  username: string;
};

export const handleAddComment = async (
  uploadedCommentData: addedCommentType
) => {
  return axios
    .post("/api/createNewComment/createNewComment", uploadedCommentData)
    .then((res) => {
      return res.data.newPost;
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
