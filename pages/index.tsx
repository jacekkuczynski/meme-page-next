import Head from "next/head";
import MemePost from "../components/MemePost/MemePost";

import MemeStreamLayout from "../components/MemeStreamLayout/MemeStreamLayout";
import Profile from "../components/Profile/Profile";

export default function Home() {
  const handleTest = async () => {
    const body = {
      upVotes: 0,
      downVotes: 0,
      memeTitle: "siema",
      fileURL: "siemaURL",
    };

    console.log("clicked");

    try {
      const response = await fetch("/api/createNewPost/createNewPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong...");
      } else {
        console.log("succes");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
        <button onClick={handleTest}>Test Planetscale</button>

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
