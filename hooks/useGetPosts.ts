import { useState, useEffect, useCallback } from 'react';
import { postsFetchedAtOnce } from '../config/postsFetchedAtOnce';
import { handleGetPostsForInfiniteScroll } from '../utils/handleGetPostsForInfiniteScroll';
import { useGetPostsWithOrWOUser } from './useGetPostsWithOrWOUser';

interface UseGetPostsI {
  postCount: number;
}

export const useGetPosts = ({ postCount }: UseGetPostsI) => {
  const postsData = useGetPostsWithOrWOUser();
  const [scrollY, setScrollY] = useState(0);
  const [scrollThreshold, setScrollThreshold] = useState(0);
  const [postsToSkip, setPostsToSkip] = useState(postsFetchedAtOnce);
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState<any>();
  const [maxRefetchCount, setMaxRefetchCount] = useState(0);
  const [refetchCount, setRefetchCount] = useState(0);
  const [refetchRemainder, setRefetchRemainder] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

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
    if (scrollY < windowHeight - 200) {
      setScrollThreshold(windowHeight - 200);
    }
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
      handleGetPostsForInfiniteScroll({
        postsToSkip: numberOfPostsToSkip,
      }).then((res) => {
        const newPosts = res.postsForInfiniteScroll;
        // setPostsToSkip(postsToSkip + postsFetchedAtOnce);
        setData([...data, newPosts].flat());
      });
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
    scrollThreshold,
    scrollY,
    windowHeight,
  ]);

  // set if you can fetch again
  useEffect(() => {
    if (windowHeight > scrollY && isFetched) {
      setIsFetched(false);
    }
  }, [isFetched, scrollThreshold, scrollY, windowHeight]);

  return { data };
};
