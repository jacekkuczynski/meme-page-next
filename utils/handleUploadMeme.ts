import axios from "axios";

type uploadedPostDataType = {
  upVotes: number;
  downVotes: number;
  memeTitle: string;
  fileURL: string;
};

const initialUpVotesCount = 0;
const initialDownVotesCount = 0;
//file url = w8 till return from fire storage

export const handleUploadMemeClick = async (
  event: MouseEvent,
  uploadedPostData: uploadedPostDataType
) => {
  event.preventDefault();
  console.log("clicked");

  axios
    .post("/api/createNewPost/createNewPost", uploadedPostData)
    .then((res) => {
      console.log("succes", res);
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};

//click handler => fire function that return Promise<void>
