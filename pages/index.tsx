import Head from "next/head";
import MemePost from "../components/MemePost/MemePost";
import MemeStreamLayout from "../components/MemePost/MemeStreamLayout/MemeStreamLayout";

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
        <h1>Welcome to Meme Page!</h1>
        <MemeStreamLayout>
          <MemePost imageSrc={""} />
          <MemePost imageSrc={""} />
          <MemePost imageSrc={""} />
        </MemeStreamLayout>
      </main>
    </>
  );
}
