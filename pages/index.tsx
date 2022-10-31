import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Meme Page</title>
        <meta
          name="description"
          content="Meme page using next.js, prisma and planetScale"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <h1 className="">Welcome to Meme Page!</h1>
      </main>
    </div>
  );
}
