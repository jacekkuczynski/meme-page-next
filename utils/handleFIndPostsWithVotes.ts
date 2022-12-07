import axios from "axios";

interface findPostsWithVotesI {
  postsIds: number[];
  userEmail: string;
}

type postTypeWithLike = {
  isDisliked: boolean;
  isLiked: boolean;
  postId: number;
  userEmail: string;
};

export const handleFIndPostsWithVotes = async (
  findPostsWithVotesData: findPostsWithVotesI
) => {
  return axios
    .post("/api/findPostsWithVotes/findPostsWithVotes", findPostsWithVotesData)
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
