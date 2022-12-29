import axios from 'axios';

interface HandleGetPostsForScrollI {
  postsToSkip: number;
}

export const handleGetPostsForScroll = async ({
  postsToSkip,
}: HandleGetPostsForScrollI) =>
  axios
    .post('/api/getPostsForScroll/getPostsForScroll', {
      postsToSkip,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log('handleGetPostsForScroll went wrong...', err);
    });
