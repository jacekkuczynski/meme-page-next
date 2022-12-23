import axios from 'axios';

type UploadedPostDataType = {
  upvoteCount: number;
  downvoteCount: number;
  memeTitle: string;
  fileURL: string;
  username: string;
  userAvatarURL: string;
  liked: boolean | null;
};

export const handleUploadMemeDataToDb = async (
  uploadedPostData: UploadedPostDataType,
) =>
  axios
    .post('/api/createNewPost/createNewPost', uploadedPostData)
    .then((res) => res.data.newPost)
    .catch((err) => {
      console.log('something went wrong...', err);
    });
