import axios from 'axios';

interface HandleGetVotesForPostI {
  postId: number;
  userEmail: string;
}

export const handleGetVotesForPost = async ({
  postId,
  userEmail,
}: HandleGetVotesForPostI) => {
  const params = { postId, userEmail };

  return axios
    .post('/api/getVotesForPost/getVotesForPost', params)
    .then((res) => res.data.votesForPost)
    .catch((err) => {
      console.log('something went wrong...', err);
    });
};
