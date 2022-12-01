import Head from "next/head";
import MemePost from "../components/MemePost/MemePost";

import MemeStreamLayout from "../components/MemeStreamLayout/MemeStreamLayout";
import Navbar from "../components/Navbar/Navbar";
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
};

export default function Home({ posts }: { posts: post[] }) {
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
            {posts.length > 0 &&
              posts.map((post: post, index: number) => {
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
