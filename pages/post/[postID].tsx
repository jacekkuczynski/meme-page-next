import { prisma } from "../api";
import Navbar from "../../components/Navbar/Navbar";
import MemePost from "../../components/MemePost/MemePost";
import MemeStreamLayout from "../../components/MemeStreamLayout/MemeStreamLayout";
import { GetServerSideProps } from "next/types";
import { PostType } from "../../types/types";
import CommentsForm from "../../components/CommentsSection/CommentsForm";
import CommentsCount from "../../components/CommentsSection/CommentsCount";

interface PostPageI {
  post: PostType | null;
}

const PostID = ({ post }: PostPageI) => {
  console.log(post);
  const postData = post?.postData;
  const commentsData = post?.commentsData;
  return (
    <>
      <Navbar />
      <MemeStreamLayout>
        {postData ? (
          <MemePost
            userAvatarURL={"/avatarExample.png"}
            username={postData.username}
            memeTitle={postData.memeTitle}
            fileURL={postData.fileURL}
            upvoteCount={postData.upvoteCount}
            downvoteCount={postData.downvoteCount}
            commentCount={0}
            postHref={postData.id}
          />
        ) : (
          <div>Sorry, no meme of given url</div>
        )}
        {commentsData ? (
          <CommentsCount commentsCount={commentsData.length} />
        ) : (
          <CommentsCount />
        )}
        <CommentsForm />
      </MemeStreamLayout>
    </>
  );
};

export default PostID;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = context.query.postID;

  //check if route is integer e.g. "/post/12", if true, query db to find specific post
  if (Number.isInteger(Number(url))) {
    const postData = await prisma.post.findUnique({
      where: {
        id: Number(url),
      },
    });
    const commentsData = await prisma.comment.findMany({
      where: {
        postId: Number(url),
      },
    });
    if (postData !== null) {
      const post = JSON.parse(JSON.stringify({ postData, commentsData }));
      return { props: { post } };
    } else return { props: { post: null } };
  } else return { props: { post: null } };
};
