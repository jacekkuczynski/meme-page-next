import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useEffect, useState } from "react";
import MemePost from "../components/MemePost/MemePost";

import MemeStreamLayout from "../components/MemeStreamLayout/MemeStreamLayout";
import Navbar from "../components/Navbar/Navbar";
import { handleGetPostsToDisplay } from "../utils/handleGetPostsToDisplay";
import { handleGetPostsToDisplayWithUser } from "../utils/handleGetPostsToDisplayWithUser";
// import Profile from "../components/Profile/Profile";
import { prisma } from "./api";

export type post = {
  createdAt: string;
  downvoteCount: number;
  fileURL: string;
  id: number;
  memeTitle: string;
  upvoteCount: number;
  updatedAt: string;
  userAvatarURL: string;
  username: string;
  liked?: boolean | null;
  _count: _count;
};

type _count = {
  comments: number;
};

export default function Home() {
  const [postsData, setPostsData] = useState<post[] | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      handleGetPostsToDisplayWithUser().then((res) => {
        console.log(res);
      });
    } else {
      handleGetPostsToDisplay().then((res) => {
        setPostsData(res);
      });
    }
  }, [user]);

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
        <MemeStreamLayout>
          {/* <Profile /> */}
          <>
            {postsData &&
              postsData.map((post: post, index: number) => {
                return (
                  <MemePost
                    key={index}
                    userAvatarURL={"/avatarExample.png"}
                    username={post.username}
                    memeTitle={post.memeTitle}
                    fileURL={post.fileURL}
                    upvoteCount={post.upvoteCount}
                    downvoteCount={post.downvoteCount}
                    commentCount={post._count.comments}
                    postHref={post.id}
                    liked={post.liked}
                  />
                );
              })}
          </>
        </MemeStreamLayout>
      </main>
    </>
  );
}
