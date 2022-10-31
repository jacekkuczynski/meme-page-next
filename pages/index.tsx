import Head from "next/head";
import MemePost from "../components/MemePost/MemePost";
import MemeStreamLayout from "../components/MemeStreamLayout/MemeStreamLayout";

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
