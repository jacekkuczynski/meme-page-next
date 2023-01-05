import Link from 'next/link';
import React from 'react';

interface MiniatureCommentI {
  commentContent: string;
  date: string;
  id: number;
  postId: number;
  index: number;
}

function MiniatureComment({
  postId,
  id,
  commentContent,
  date,
  index,
}: MiniatureCommentI) {
  return (
    <div key={id} className={index % 2 === 0 ? 'bg-neutral-200' : ''}>
      <Link href={`/post/${postId}`}>
        <div className="flex justify-between w-full gap-12 hover:text-blue-800 text-xs">
          <div>post: {postId}</div>
          <div>{commentContent} </div>
          <div>{new Date(Date.parse(date)).toDateString()}</div>
        </div>
      </Link>
    </div>
  );
}

export default MiniatureComment;
