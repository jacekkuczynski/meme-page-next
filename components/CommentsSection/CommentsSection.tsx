import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { commentType } from "../../types/types";
import { handleAddComment } from "../../utils/handleAddComment";
import CommentsForm from "./CommentsForm";

interface CommentsSectionI {
  commentsCount?: number;
  username: string;
  comment: commentType[] | [];
}

const CommentsSection = ({
  commentsCount,
  username,
  comment,
}: CommentsSectionI) => {
  const [commentsState, setCommentsState] = useState<commentType[]>([]);

  useEffect(() => {
    if (comment) setCommentsState(comment);
  }, []);

  const handleOnSubmit = (newCommentData: commentType) => {
    setCommentsState((prevState) => [...prevState, newCommentData]);
  };

  return (
    <>
      {/* comments count */}
      <div className="w-8/12 mx-auto mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion ({commentsCount ? commentsCount : 0})
          </h2>
        </div>
      </div>
      {/* comments form */}
      {username.length > 0 ? (
        <CommentsForm username={username} onSubmit={handleOnSubmit} />
      ) : (
        <div className="my-8">Login to post comment</div>
      )}
      {/* comment display */}
      <div className="w-8/12">
        {commentsState.map((comment, index) => {
          const date = new Date(Date.parse(comment.date)).toDateString();
          return (
            <div
              key={index}
              className="w-full flex flex-col mb-8 mr-3 border border-gray-200 p-4 rounded bg-neutral-50 shadow-sm "
            >
              <div className="text-sm text-gray-700 font-light">
                {comment.username}
              </div>
              <div className="text-xs text-gray-500 font-light">{date}</div>
              <div className="text-base text-gray-800 mt-2 ">
                {comment.commentContent}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommentsSection;
