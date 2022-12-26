import { useUser } from '@auth0/nextjs-auth0/';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { handleGetVotesForPost } from '../utils/handleGetVotesForPost';

export const useGetVoteForSinglePost = () => {
  const { user } = useUser();
  const [userState, setUserState] = useState('');
  const [isPostLiked, setIsPostLiked] = useState<null | boolean>(null);
  const router = useRouter();

  useEffect(() => {
    const { postID } = router.query;
    if (user?.nickname && Number.isInteger(Number(postID))) {
      const userEmail = user.email ? user.email : '';
      setUserState(user.nickname);
      handleGetVotesForPost({
        postId: Number(postID),
        userEmail: userEmail.toString(),
      }).then((res) => {
        setIsPostLiked(res?.isLiked);
      });
    }
  }, [router.query, router.query.postID, user]);

  return { userState, isPostLiked };
};
