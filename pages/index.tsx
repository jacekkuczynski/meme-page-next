import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';

import { prisma } from './api';
import MemePost from '../components/MemePost/MemePost';
import { SinglePostType } from '../types/types';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { useGetPostsAndHandleInfiniteScroll } from '../hooks/useGetPostsAndHandleInfiniteScroll';

interface HomeI {
  postCount: number;
}

export default function Home({ postCount }: HomeI) {
  const { data, isMorePosts, isLoading } = useGetPostsAndHandleInfiniteScroll({
    postCount,
  });

  return (
    <>
      <Head>
        <title>Meme Page</title>
        <meta
          name="description"
          content="Meme page using next.js, prisma and planetScale"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main>
        <div className="meme-stream">
          {data ? (
            data.map((post: SinglePostType) => (
              <MemePost
                key={post.id}
                userAvatarURL="/avatarExample.png"
                username={post.username}
                memeTitle={post.memeTitle}
                fileURL={post.fileURL}
                upvoteCount={post.upvoteCount}
                downvoteCount={post.downvoteCount}
                commentCount={post.commentCount}
                postHref={post.id}
                liked={post.liked}
              />
            ))
          ) : (
            <LoadingSpinner />
          )}
          {!isMorePosts && <div className="py-4">No more posts</div>}
          {isLoading && <div className="py-4">Loading...</div>}
          {isMorePosts && !isLoading && <div className="py-4"> </div>}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const postCount = await prisma.post.count();
  return {
    props: { postCount },
  };
}
