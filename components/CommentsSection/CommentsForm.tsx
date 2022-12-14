import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { handleAddComment } from '../../utils/handleAddComment';

interface CommentsFormI {
  username: string;
  onSubmit: Function;
}

function CommentsForm({ username, onSubmit }: CommentsFormI) {
  const [commentContentState, setCommentContentState] = useState('');
  const router = useRouter();
  const currentPost = Number(router.query.postID);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddComment({
      commentContent: commentContentState,
      postId: currentPost,
      username,
    }).then((res) => {
      onSubmit(res);
    });
    if (textAreaRef.current) textAreaRef.current.value = '';
  };

  return (
    <section className="bg-white w-8/12 py-8">
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
            />
          </div>
          <button type="submit" className="button">
            Post comment
          </button>
        </form>
      </div>
    </section>
  );
}

export default CommentsForm;
