export type PostType = { postData: postData; commentsData?: commentType[] };

type postData = {
  createdAt: string;
  downvoteCount: number;
  fileURL: string;
  id: number;
  memeTitle: string;
  updatedAt: string;
  upvoteCount: number;
  userAvatarURL: string;
  username: string;
  comments: string[];
};

export type commentType = {
  commentContent: string;
  date: string;
  id: number;
  postId: number;
  username: string;
};
