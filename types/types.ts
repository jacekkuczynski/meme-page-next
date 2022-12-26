export type PostType = { postData: PostDataT; commentsData?: CommentT[] };

export type PostDataT = {
  id: number;
  createdAt: string;
  upvoteCount: number;
  downvoteCount: number;
  comments: string[];
  memeTitle: string;
  fileURL: string;
  username: string;
  userAvatarURL: string;
  updatedAt: string;
  userId: string;
  User: string;
  VotesByUser: string[];
};

export type SinglePostType = {
  id: number;
  createdAt: string;
  upvoteCount: number;
  downvoteCount: number;
  comments?: string[];
  memeTitle: string;
  fileURL: string;
  username: string;
  userAvatarURL: string;
  updatedAt: string;
  liked?: boolean | null;
  commentCount: number;
};

export type CommentT = {
  commentContent: string;
  date: string;
  id: number;
  postId: number;
  username: string;
};
