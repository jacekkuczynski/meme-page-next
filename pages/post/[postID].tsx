import { prisma } from "../api";
import Navbar from "../../components/Navbar/Navbar";
import MemePost from "../../components/MemePost/MemePost";
import MemeStreamLayout from "../../components/MemeStreamLayout/MemeStreamLayout";
import { GetServerSideProps } from "next/types";
import { PostType } from "../../types/types";

interface PostI {
  post: PostType | null;
}

const PostID = ({ post }: PostI) => {
  return (
    <>
      <Navbar />
      <MemeStreamLayout>
        {post ? (
          <MemePost
            userAvatarURL={"/avatarExample.png"}
            username={post.username}
            memeTitle={post.memeTitle}
            fileURL={post.fileURL}
            upvoteCount={post.upvoteCount}
            downvoteCount={post.downvoteCount}
            commentCount={0}
            postHref={post.id}
          />
        ) : (
          <div>Sorry, no meme of given url</div>
        )}
      </MemeStreamLayout>
    </>
  );
};

export default PostID;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = context.query.postID;

  if (Number.isInteger(Number(url))) {
    const data = await prisma.post.findUnique({
      where: {
        id: Number(url),
      },
    });
    if (data !== null) {
      const post = JSON.parse(JSON.stringify(data));
      return { props: { post } };
    } else return { props: { post: null } };
  } else return { props: { post: null } };
};
