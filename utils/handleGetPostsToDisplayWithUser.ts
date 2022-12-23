import axios from 'axios';

interface HandleGetPostsToDisplayWithUserI {
  userEmail: string;
}

export const handleGetPostsToDisplayWithUser = async ({
  userEmail,
}: HandleGetPostsToDisplayWithUserI) => {
  const params = { userEmail };
  return axios
    .post('/api/getPostsToDisplayWithUser/getPostsToDisplayWithUser', params)
    .then((res) =>
      res.data.postsToDisplayWithUser.map((post: any) => {
        const mapLikeArray = post.VotesByUser.map((el: any) => el.isLiked)[0];
        const isLiked = mapLikeArray === undefined ? null : mapLikeArray;
        return {
          createdAt: post.createdAt,
          downvoteCount: post.downvoteCount,
          fileURL: post.fileURL,
          id: post.id,
          memeTitle: post.memeTitle,
          upvoteCount: post.upvoteCount,
          updatedAt: post.updatedAt,
          userAvatarURL: post.userAvatarURL,
          userId: post.userId,
          username: post.username,
          // eslint-disable-next-line no-underscore-dangle
          commentCount: post._count.comments,
          liked: isLiked,
        };
      }),
    )
    .catch((err) => {
      console.log('something went wrong...', err);
    });
};
