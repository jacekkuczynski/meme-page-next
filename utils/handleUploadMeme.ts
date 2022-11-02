import axios from "axios";

type uploadedPostDataType = {
  upVotes: number;
  downVotes: number;
  memeTitle: string;
  fileURL: string;
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
