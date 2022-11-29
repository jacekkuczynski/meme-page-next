import { commentType } from "../../types/types";

interface CommentDisplayI {
  comment: commentType[];
}

const CommentsDisplay = (comment: CommentDisplayI) => {
  return (
    <div className="w-8/12">
      {comment &&
        comment.comment.map((comment, index) => {
          const date = new Date(Date.parse(comment.date)).toDateString();
          console.log(date);
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
  );
};

export default CommentsDisplay;

// new Date(year, monthIndex, day, hours, minutes);
