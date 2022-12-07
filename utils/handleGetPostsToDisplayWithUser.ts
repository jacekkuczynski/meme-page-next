import axios from "axios";

export const handleGetPostsToDisplayWithUser = async (userEmail: any) => {
  return axios
    .get("/api/getPostsToDisplayWithUser/getPostsToDisplayWithUser", userEmail)
    .then((res) => {
      return res.data.postsToDisplayWithUser.map((post: any) => {
        const mapLikeArray = post.VotesByUser.map((el: any) => {
          return el.isLiked;
        })[0];
        const isLiked = mapLikeArray == undefined ? null : mapLikeArray;
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
          commentCount: post._count.comments,
          liked: isLiked,
        };
      });
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
