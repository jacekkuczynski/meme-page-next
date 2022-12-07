import { useUser } from "@auth0/nextjs-auth0";
import { resolveSoa } from "dns";
import Head from "next/head";
import { useEffect, useState } from "react";
import MemePost from "../components/MemePost/MemePost";

import MemeStreamLayout from "../components/MemeStreamLayout/MemeStreamLayout";
import Navbar from "../components/Navbar/Navbar";
import { handleFIndPostsWithVotes } from "../utils/handleFIndPostsWithVotes";
import { handleGetPostsToDisplay } from "../utils/handleGetPostsToDisplay";
// import Profile from "../components/Profile/Profile";
import { prisma } from "./api";

type post = {
  createdAt: string;
  downvoteCount: number;
  fileURL: string;
  id: number;
  memeTitle: string;
  upvoteCount: number;
  updatedAt: string;
  userAvatarURL: string;
  username: string;
  liked: boolean | null;
};

export default function Home({ posts }: { posts: post[] }) {
  const [postsData, setPostsData] = useState<post[]>([]);
  const { user } = useUser();

  // console.log(posts);

  useEffect(() => {
    if (user?.email) {
      handleGetPostsToDisplay().then((res) => {
        setPostsData(res);
        console.log(res, "res");
      });

      const postsIds = posts.map((post) => {
        return post.id;
      });
      // console.log(posts);
      const userEmail = user.email;
      handleFIndPostsWithVotes({ postsIds, userEmail }).then((res) => {
        console.log(res);

        console.log(
          posts.map((post, index) => {
            return res.find((el) => {
              return post.id === el.id;
            });
          })
        );
        setPostsData(
          posts.map((post, index) => {
            return { ...post, ...res[index] };
          })
        );
      });
      setPostsData(posts);
    } else {
      posts.forEach((post) => {
        post.liked = null;
      });
      setPostsData(posts);
    }
  }, [user, posts]);
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

export const getServerSideProps = async () => {
  const data = await prisma.post.findMany({ take: 20 });
  const posts = JSON.parse(JSON.stringify(data));
  return { props: { posts } };
};
