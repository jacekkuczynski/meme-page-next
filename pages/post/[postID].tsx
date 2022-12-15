import { prisma } from "../api";
import Navbar from "../../components/Navbar/Navbar";
import MemePost from "../../components/MemePost/MemePost";
import { GetServerSideProps } from "next/types";
import { PostType } from "../../types/types";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import CommentsSection from "../../components/CommentsSection/CommentsSection";
import { useRouter } from "next/router";
import { handleGetVotesForPost } from "../../utils/handleGetVotesForPost";

interface PostPageI {
  post: PostType | null;
}

const PostID = ({ post }: PostPageI) => {
  const { user } = useUser();
  const [userState, setUserState] = useState("");
  const [isPostLiked, setIsPostLiked] = useState<null | boolean>(null);
  const postData = post?.postData;
  const commentsData = post?.commentsData;
  const router = useRouter();

  useEffect(() => {
    const postID = router.query.postID;
    if (user?.nickname && Number.isInteger(Number(postID))) {
      const userEmail = user.email ? user.email : "";
      setUserState(user.nickname);
      handleGetVotesForPost({
        postId: Number(postID),
        userEmail: userEmail.toString(),
      }).then((res) => {
        setIsPostLiked(res.isLiked);
      });
    }
  }, [router.query.postID, user]);

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center w-full">
        {postData ? (
          <>
            <MemePost
              userAvatarURL={"/avatarExample.png"}
              username={postData.username}
              memeTitle={postData.memeTitle}
              fileURL={postData.fileURL}
              upvoteCount={postData.upvoteCount}
              downvoteCount={postData.downvoteCount}
              commentCount={commentsData!.length}
              postHref={postData.id}
              liked={isPostLiked}
            />
            {commentsData ? (
              <CommentsSection
                commentsCount={commentsData?.length}
                username={userState}
                comment={commentsData}
              />
            ) : (
              <CommentsSection username={userState} comment={[]} />
            )}
          </>
        ) : (
          <>
            <div>Sorry, no meme of given url</div>
          </>
        )}
      </section>
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
