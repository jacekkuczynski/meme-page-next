import axios from 'axios';

export const handleGetPostsToDisplay = async () =>
  axios
    .get('/api/getPostsToDisplay/getPostsToDisplay')
    .then((res) =>
      res.data.postsToDisplay.map((post: any) => ({
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
      })),
    )
    .catch((err) => {
      console.log('something went wrong...', err);
    });
