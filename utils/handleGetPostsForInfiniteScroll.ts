import axios from 'axios';

interface HandleGetPostsForInfiniteScrollI {
  postsToSkip: number;
}

export const handleGetPostsForInfiniteScroll = async ({
  postsToSkip,
}: HandleGetPostsForInfiniteScrollI) =>
  axios
    .post('/api/getPostsForInfiniteScroll/getPostsForInfiniteScroll', {
      postsToSkip,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log('handleGetPostsForInfiniteScroll went wrong...', err);
    });
