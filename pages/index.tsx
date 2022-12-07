import { useUser } from "@auth0/nextjs-auth0";
import { resolveSoa } from "dns";
import Head from "next/head";
import { off } from "process";
import { useEffect, useState } from "react";
import MemePost from "../components/MemePost/MemePost";

import MemeStreamLayout from "../components/MemeStreamLayout/MemeStreamLayout";
import Navbar from "../components/Navbar/Navbar";
import { handleFindPostsWithVotes } from "../utils/handleFindPostsWithVotes";
import { handleGetPostsToDisplay } from "../utils/handleGetPostsToDisplay";
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
};

// { posts }: { posts: post[] }

export default function Home() {
  const [postsData, setPostsData] = useState<post[] | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      handleGetPostsToDisplay()
        .then((res) => {
          return res;
        })
        .then((res) => {
          const postIds = res.map((post: any) => {
            return post.id;
          });
          const postData = res;
          console.log(postIds, "postIds");
          const userEmail = user.email;
          handleFindPostsWithVotes({ postIds, userEmail }).then((res) => {
            const postDataWithVotes = postData.map((post: any) => ({
              ...post,
              ...res.find((el: any) => el.id === post.id),
            }));
            setPostsData(postDataWithVotes);
          });
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
                    commentCount={0}
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
