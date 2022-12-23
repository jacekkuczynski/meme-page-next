import React from 'react';
import { GetServerSideProps } from 'next/types';
import { prisma } from '../api';
import Navbar from '../../components/Navbar/Navbar';
import MemePost from '../../components/MemePost/MemePost';
import { PostType } from '../../types/types';
import CommentsSection from '../../components/CommentsSection/CommentsSection';
import { useGetVoteForSinglePost } from '../../hooks/useGetVoteForSinglePost';

interface PostPageI {
  post: PostType | null;
}

function PostID({ post }: PostPageI) {
  const postData = post?.postData;
  const commentsData = post?.commentsData;
  const { userState, isPostLiked } = useGetVoteForSinglePost();

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center w-full">
        {postData ? (
          <>
            <MemePost
              userAvatarURL="/avatarExample.png"
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
              <CommentsSection username={userState} comments={commentsData} />
            ) : (
              <CommentsSection username={userState} comments={[]} />
            )}
          </>
        ) : (
          <div>Sorry, no meme of given url</div>
        )}
      </section>
    </>
  );
}

export default PostID;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = context.query.postID;

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
    }
    return { props: { post: null } };
  }
  return { props: { post: null } };
};
