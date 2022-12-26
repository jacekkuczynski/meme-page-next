import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import { SinglePostType } from '../types/types';
import { handleGetPostsToDisplay } from '../utils/handleGetPostsToDisplay';
import { handleGetPostsToDisplayWithUser } from '../utils/handleGetPostsToDisplayWithUser';

export const useGetPostsWithOrWOUser = () => {
  const [postsData, setPostsData] = useState<SinglePostType[] | null>(null);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      const userEmail = user.email ? user.email : '';
      handleGetPostsToDisplayWithUser({ userEmail }).then((res) => {
        setPostsData(res);
      });
    } else {
      handleGetPostsToDisplay().then((res) => {
        setPostsData(res);
      });
    }
  }, [user]);
  return postsData;
};
