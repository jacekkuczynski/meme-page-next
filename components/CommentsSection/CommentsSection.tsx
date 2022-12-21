import React, { useState, useEffect } from 'react';
import { commentType } from '../../types/types';
import CommentsForm from './CommentsForm';

interface CommentsSectionI {
  username: string;
  comments: commentType[] | [];
}

function CommentsSection({ username, comments }: CommentsSectionI) {
  const [commentsState, setCommentsState] = useState<commentType[]>([]);

  useEffect(() => {
    if (comments) setCommentsState(comments);
  }, [comments]);

  const handleOnSubmit = (newCommentData: commentType) => {
    setCommentsState((prevState) => [...prevState, newCommentData]);
  };

  return (
    <>
      {/* comments count */}
      <div className="w-8/12 mx-auto mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion ({commentsState.length})
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
        {commentsState.map((comment) => {
          const date = new Date(Date.parse(comment.date)).toDateString();
          return (
            <div
              key={comment.id}
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
}

export default CommentsSection;
