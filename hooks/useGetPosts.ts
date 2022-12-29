import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect, useCallback } from 'react';
import { postsFetchedAtOnce } from '../config/postsFetchedAtOnce';
import { handleGetPostsForScroll } from '../utils/handleGetPostsForScroll';
import { handleGetPostsForScrollWithUser } from '../utils/handleGetPostsForScrollWithUser';
import { useGetPostsWithOrWOUser } from './useGetPostsWithOrWOUser';

interface UseGetPostsI {
  postCount: number;
}

export const useGetPosts = ({ postCount }: UseGetPostsI) => {
  const postsData = useGetPostsWithOrWOUser();
  const [scrollY, setScrollY] = useState(0);
  const [postsToSkip, setPostsToSkip] = useState(postsFetchedAtOnce);
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState<any>();
  const [maxRefetchCount, setMaxRefetchCount] = useState(0);
  const [refetchCount, setRefetchCount] = useState(0);
  const [refetchRemainder, setRefetchRemainder] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const { user } = useUser();

  // possible refetches
  useEffect(() => {
    const maxCountRefetch = Math.ceil(postCount / postsFetchedAtOnce);
    const maxRefetchRemainder = postCount % postsFetchedAtOnce;
    setRefetchRemainder(maxRefetchRemainder);
    // 1 - initial fetch
    setMaxRefetchCount(maxCountRefetch - 1);
  }, [postCount]);

  useEffect(() => {
    if (postsData) setData(postsData);
  }, [postsData]);

  useEffect(() => {
    const wH = document.body.clientHeight - window.innerHeight;
    setWindowHeight(wH);
  }, [postsData, scrollY, windowHeight, postsData]);

  const onScroll = useCallback(() => {
    const { pageYOffset } = window;

    setScrollY(pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  // fetching
  useEffect(() => {
    const fetchNewPosts = (numberOfPostsToSkip: number) => {
      if (user) {
        const userEmail = user.email ? user.email : '';
        handleGetPostsForScrollWithUser({
          postsToSkip: numberOfPostsToSkip,
          userEmail,
        }).then((res) => {
          const newPosts = res;
          setData([...data, newPosts].flat());
        });
      } else {
        handleGetPostsForScroll({
          postsToSkip: numberOfPostsToSkip,
        }).then((res) => {
          const newPosts = res.postsForScroll;
          setData([...data, newPosts].flat());
        });
      }
    };

    if (
      windowHeight === scrollY &&
      !isFetched &&
      refetchCount < maxRefetchCount
    ) {
      setIsFetched(true);
      if (refetchCount === maxRefetchCount) {
        setPostsToSkip(postsToSkip + postsFetchedAtOnce);
        const postsToSkipWithRemainder =
          postsToSkip + refetchRemainder - postsFetchedAtOnce;
        fetchNewPosts(postsToSkipWithRemainder);
      } else {
        setPostsToSkip(postsToSkip + postsFetchedAtOnce);
        fetchNewPosts(postsToSkip);
      }

      setRefetchCount(refetchCount + 1);
    }
  }, [
    data,
    isFetched,
    maxRefetchCount,
    postsToSkip,
    refetchCount,
    refetchRemainder,
    scrollY,
    user,
    windowHeight,
  ]);

  // set if you can fetch again
  useEffect(() => {
    if (windowHeight > scrollY && isFetched) {
      setIsFetched(false);
    }
  }, [isFetched, scrollY, windowHeight]);

  return { data };
};
