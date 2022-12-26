import axios from 'axios';

type AddedCommentType = {
  commentContent: string;
  postId: number;
  username: string;
};

export const handleAddComment = async (uploadedCommentData: AddedCommentType) =>
  axios
    .post('/api/createNewComment/createNewComment', uploadedCommentData)
    .then((res) => res.data.newComment)
    .catch((err) => {
      console.log('something went wrong...', err);
    });
