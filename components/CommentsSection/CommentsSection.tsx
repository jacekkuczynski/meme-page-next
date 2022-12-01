import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { commentType } from "../../types/types";
import { handleAddComment } from "../../utils/handleAddComment";

interface CommentsSectionI {
  commentsCount?: number;
  username: string;
  comment: commentType[];
}

const CommentsSection = ({
  commentsCount,
  username,
  comment,
}: CommentsSectionI) => {
  const [commentContentState, setCommentContentState] = useState("");
  const router = useRouter();
  const currentPost = Number(router.query.postID);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddComment({
      commentContent: commentContentState,
      postId: currentPost,
      username: username,
    });
    if (textAreaRef.current) textAreaRef.current.value = "";
    setInterval(() => {
      location.reload();
    }, 1000);
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
      <div className="bg-white w-8/12 py-8">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <textarea
                ref={textAreaRef}
                onChange={(e) => {
                  setCommentContentState(e.target.value);
                }}
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button type="submit" className="button">
              Post comment
            </button>
          </form>
        </div>
      </div>
      <div className="w-8/12">
        {comment &&
          comment.map((comment, index) => {
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
