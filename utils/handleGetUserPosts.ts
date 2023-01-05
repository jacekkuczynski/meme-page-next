import axios from 'axios';

interface HandleGetUserPostsI {
  username: string;
}

export const handleGetUserPosts = async ({ username }: HandleGetUserPostsI) =>
  axios
    .post('/api/getUserPosts/getUserPosts', {
      username,
    })
    .then((res) => res.data.userPosts)
    .catch((err) => {
      console.log('handleGetUserPosts went wrong...', err);
    });
