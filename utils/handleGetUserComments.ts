import axios from 'axios';

interface HandleGetUserCommentsI {
  username: string;
}

export const handleGetUserComments = async ({
  username,
}: HandleGetUserCommentsI) =>
  axios
    .post('/api/getUserComments/getUserComments', {
      username,
    })
    .then((res) => res.data.userComments)
    .catch((err) => {
      console.log('handleGetUserComments went wrong...', err);
    });
