import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect, useCallback } from 'react';
import { postsFetchedAtOnce } from '../config/postsFetchedAtOnce';
import { handleGetPostsForScroll } from '../utils/handleGetPostsForScroll';
import { handleGetPostsForScrollWithUser } from '../utils/handleGetPostsForScrollWithUser';
import { useGetPostsWithOrWOUser } from './useGetPostsWithOrWOUser';

interface UseGetPostsAndHandleInfiniteScroll {
  postCount: number;
}

export const useGetPostsAndHandleInfiniteScroll = ({
  postCount,
}: UseGetPostsAndHandleInfiniteScroll) => {
  const postsData = useGetPostsWithOrWOUser();
  const [scrollY, setScrollY] = useState(0);
  const [postsToSkip, setPostsToSkip] = useState(postsFetchedAtOnce);
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState<any>();
  const [maxRefetchCount, setMaxRefetchCount] = useState(0);
  const [refetchCount, setRefetchCount] = useState(0);
  const [refetchRemainder, setRefetchRemainder] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMorePosts, setIsMorePosts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  // possible refetches
  useEffect(() => {
    const maxCountRefetch = Math.ceil(postCount / postsFetchedAtOnce) - 1; //  - initial fetch
    const maxRefetchRemainder = postCount % postsFetchedAtOnce;
    setRefetchRemainder(maxRefetchRemainder);
    setMaxRefetchCount(maxCountRefetch);
  }, [postCount]);

  // is more posts
  useEffect(() => {
    if (refetchCount === maxRefetchCount) {
      setIsMorePosts(false);
    } else {
      setIsMorePosts(true);
    }
  }, [maxRefetchCount, refetchCount]);

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
        setIsLoading(true);
        handleGetPostsForScrollWithUser({
          postsToSkip: numberOfPostsToSkip,
          userEmail,
        })
          .then((res) => {
            const newPosts = res;
            setData([...data, ...newPosts]);
            setRefetchCount(refetchCount + 1);
          })
          .finally(() => {
            setTimeout(() => {
              setIsLoading(false);
              setIsFetched(false);
            }, 1000);
          });
      } else {
        setIsLoading(true);
        handleGetPostsForScroll({
          postsToSkip: numberOfPostsToSkip,
        })
          .then((res) => {
            const newPosts = res.postsForScroll;
            setData([...data, ...newPosts]);
            setRefetchCount(refetchCount + 1);
          })
          .finally(() => {
            setTimeout(() => {
              setIsLoading(false);
              setIsFetched(false);
            }, 1000);
          });
      }
    };

    if (
      scrollY >= windowHeight - 10 &&
      windowHeight > 0 &&
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

  return { data, isMorePosts, isLoading };
};
