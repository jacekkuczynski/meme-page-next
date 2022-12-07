export type PostType = { postData: postData; commentsData?: commentType[] };

export type postData = {
  id: number;
  upvoteCount: number;
  downvoteCount: number;
  comments: string[];
  memeTitle: string;
  fileURL: string;
  username: string;
  userAvatarURL: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  User: string;
  VotesByUser: string[];
};

export type commentType = {
  commentContent: string;
  date: string;
  id: number;
  postId: number;
  username: string;
};
