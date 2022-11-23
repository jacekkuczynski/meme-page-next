import axios from "axios";

type uploadedPostDataType = {
  upvoteCount: number;
  downvoteCount: number;
  memeTitle: string;
  fileURL: string;
  username: string;
  userAvatarURL: string;
};

export const handleUploadMemeDataToDb = async (
  uploadedPostData: uploadedPostDataType
) => {
  console.log("handleUploadMemeDataToDb Fired");

  axios
    .post("/api/createNewPost/createNewPost", uploadedPostData)
    .then((res) => {
      console.log("succes", res);
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
