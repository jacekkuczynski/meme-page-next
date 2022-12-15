import { useState, useEffect } from "react";
import { handleGetPostsForInfiniteScroll } from "../utils/handleGetPostsForInfiniteScroll";

export const useHandleInfiniteScroll = (numberOfPosts: number) => {
  const [scrollValue, setScrollValue] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [refetchCount, setRefetchCount] = useState(0);
  const [skipCount, setSkipCount] = useState(0);

  //this is bad
  const postsFetchedAtOnce = 5;
  const numberOfPossibleRefetches =
    Math.ceil(numberOfPosts / postsFetchedAtOnce) - 1;
  const [maxNumberOfRefetch, setMaxNumberOfRefetch] = useState(
    numberOfPossibleRefetches
  );

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollValue(Math.floor(e.target.documentElement.scrollTop));
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (document) setWindowHeight(window.innerHeight);
  }, [windowHeight]);

  useEffect(() => {
    const skipCount = refetchCount * postsFetchedAtOnce;

    handleGetPostsForInfiniteScroll(1).then(
      (res) => {}
      // console.log(res)
    );
  }, []);

  return { scrollValue, windowHeight };
};
