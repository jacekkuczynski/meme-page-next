import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

interface MiniaturePostI {
  fileURL: string;
  id: number;
  memeTitle: string;
  upvoteCount: number;
  downvoteCount: number;
}

function MiniaturePost({
  fileURL,
  id,
  memeTitle,
  upvoteCount,
  downvoteCount,
}: MiniaturePostI) {
  return (
    <div className="flex-col hover:scale-105 border border-neutral-100 transition-all p-2">
      <Link href={`/post/${id}`}>
        <h3 className="text-sm">{memeTitle}</h3>
        <div className=" w-32 aspect-square relative">
          <Image fill src={fileURL} alt={memeTitle} />
        </div>
      </Link>
      <div className="flex gap-2 justify- w-full text-xs">
        <div className="flex ">
          <ArrowUpIcon className="w-4 text-green-800" />
          {upvoteCount}
        </div>
        <div className="flex">
          <ArrowDownIcon className="w-4 text-red-800" />
          {downvoteCount}
        </div>
      </div>
    </div>
  );
}

export default MiniaturePost;
