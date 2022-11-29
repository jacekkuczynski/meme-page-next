export type PostType = { postData: postData; commentsData?: comment[] };

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

type comment = {
  commentContent: string;
  date: string;
  id: number;
  postId: number;
  username: string;
};
