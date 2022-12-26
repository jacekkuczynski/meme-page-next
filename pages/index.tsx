import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import { useGetPostsWithOrWOUser } from '../hooks/useGetPostsWithOrWOUser';
import { SinglePostType } from '../types/types';
import MemePost from '../components/MemePost/MemePost';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

export default function Home() {
  const postsData = useGetPostsWithOrWOUser();
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
        <main>
          <div className="meme-stream">
            {/* <Profile /> */}
            {postsData ? (
              postsData.map((post: SinglePostType) => (
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
          </div>
        </main>
      </main>
    </>
  );
}
