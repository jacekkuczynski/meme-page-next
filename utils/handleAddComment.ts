import axios from "axios";

type addedCommentType = {
  commentContent: string;
  postId: number;
  username: string;
};

export const handleAddComment = async (uploadedPostData: addedCommentType) => {
  console.log("handleAddComment Fired");

  axios
    .post("/api/createNewComment/createNewComment", uploadedPostData)
    .then((res) => {
      console.log("succes", res);
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
