import axios from "axios";

interface findPostsWithVotesI {
  postIds: number[];
  userEmail: string | null | undefined;
}

type post = {
  createdAt: string;
  downvoteCount: number;
  fileURL: string;
  id: number;
  memeTitle: string;
  upvoteCount: number;
  updatedAt: string;
  userAvatarURL: string;
  username: string;
  liked: boolean | null;
};

type postTypeWithLike = {
  isDisliked: boolean;
  isLiked: boolean;
  postId: number;
  userEmail: string;
  post: post[];
};

export const handleFindPostsWithVotes = async (
  findPostsWithVotesData: findPostsWithVotesI
) => {
  return axios

    .get("/api/findPostsWithVotes/findPostsWithVotes")
    .then((res) => {
      return res.data.postsWithVotes.map((post: postTypeWithLike) => {
        if (post.isLiked === true) {
          return {
            id: post.postId,
            liked: true,
          };
        } else if (post.isDisliked === true) {
          return {
            id: post.postId,
            liked: false,
          };
        } else if ((post.isDisliked && post.isLiked) === false) {
          return {
            id: post.postId,
            liked: null,
          };
        }
      });
    })
    .catch((err) => {
      console.log("something went wrong...", err);
    });
};
