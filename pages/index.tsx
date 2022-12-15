import { useUser } from "@auth0/nextjs-auth0";
import { prisma } from "./api";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import MemePost from "../components/MemePost/MemePost";
import MemeStreamLayout from "../components/MemeStreamLayout/MemeStreamLayout";
import Navbar from "../components/Navbar/Navbar";
import { handleGetPostsToDisplay } from "../utils/handleGetPostsToDisplay";
import { handleGetPostsToDisplayWithUser } from "../utils/handleGetPostsToDisplayWithUser";
import { useHandleInfiniteScroll } from "../hooks/useHandleInfiniteScroll";
// import Profile from "../components/Profile/Profile";

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
  commentCount: number;
};

export default function Home({ postCount }: { postCount: number }) {
  const [postsData, setPostsData] = useState<post[] | null>(null);
  const { user } = useUser();
  const { scrollValue, windowHeight } = useHandleInfiniteScroll(postCount);

  // console.log({ scrollValue, windowHeight });

  useEffect(() => {
    if (user) {
      handleGetPostsToDisplayWithUser("cipa").then((res) => {
        setPostsData(res);
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
            {postsData ? (
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
                    commentCount={post.commentCount}
                    postHref={post.id}
                    liked={post.liked}
                  />
                );
              })
            ) : (
              <LoadingSpinner />
            )}
          </>
        </MemeStreamLayout>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const postCount = await prisma.post.count();
  return { props: { postCount } };
};
