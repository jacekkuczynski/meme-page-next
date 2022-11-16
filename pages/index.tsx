import Head from "next/head";
import MemePost from "../components/MemePost/MemePost";

import MemeStreamLayout from "../components/MemeStreamLayout/MemeStreamLayout";
import Profile from "../components/Profile/Profile";
import { prisma } from "./api";

export default function Home() {
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

      <main>
        <MemeStreamLayout>
          <Profile />
          <MemePost
            userAvatarSrc={"string"}
            username={"string"}
            imageTitle={"string"}
            imageSrc={"string"}
            upvoteCount={419}
            downvoteCount={419}
            commentCount={419}
          />
          <MemePost
            userAvatarSrc={"string"}
            username={"string"}
            imageTitle={"string"}
            imageSrc={"string"}
            upvoteCount={419}
            downvoteCount={419}
            commentCount={419}
          />
          <MemePost
            userAvatarSrc={"string"}
            username={"string"}
            imageTitle={"string"}
            imageSrc={"string"}
            upvoteCount={419}
            downvoteCount={419}
            commentCount={419}
          />
        </MemeStreamLayout>
      </main>
    </>
  );
}

// export const getServerSideProps = async ({ req }) => {
//   const posts = await prisma.post.findMany({});
//   return { props: { posts } };
// };
