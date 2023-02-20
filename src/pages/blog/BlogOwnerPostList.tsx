import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Box } from "@chakra-ui/react";

import LoadingMessage from "../../components/common/LoadingMessage";
import PostList from "../../components/post/PostList";
import usePostsInfiniteQuery from "../../hooks/usePostsInfiniteQuery";
import BaseContainer from "../BaseContainer";
import { useBlogOwner } from "./Blog";

export default function BlogOwnerPostList() {
  const { blogOwner } = useBlogOwner();

  const postsInfiniteQuery = usePostsInfiniteQuery(blogOwner.username);

  const [fetchTriggerRef, fetchTriggerInView] = useInView();

  useEffect(() => {
    if (fetchTriggerInView) {
      postsInfiniteQuery.fetchNextPage();
    }
  }, [fetchTriggerInView]);

  if (postsInfiniteQuery.data) {
    const posts = postsInfiniteQuery.data.pages.flatMap((page) => page.posts);

    return (
      <BaseContainer>
        <PostList posts={posts} />
        <Box ref={fetchTriggerRef} />
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <LoadingMessage />
    </BaseContainer>
  );
}
