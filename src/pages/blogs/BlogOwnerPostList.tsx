import { useInView } from "react-intersection-observer";
import { Box } from "@chakra-ui/react";

import LoadingMessage from "../../components/LoadingMessage";
import PostList from "../../components/posts/PostList";
import usePostsInfiniteQuery from "../../hooks/posts/usePostsInfiniteQuery";
import BaseContainer from "../BaseContainer";
import { useBlogOwner } from "./Blog";

export default function BlogOwnerPostList() {
  const { blogOwner } = useBlogOwner();

  const postsInfiniteQuery = usePostsInfiniteQuery(blogOwner.username);

  const [fetchTriggerRef] = useInView({
    onChange: (inView) => {
      if (inView && !postsInfiniteQuery.isFetchingNextPage) {
        postsInfiniteQuery.fetchNextPage();
      }
    },
  });

  if (postsInfiniteQuery.data) {
    const posts = postsInfiniteQuery.data.pages.flatMap((page) => page.posts);

    return (
      <BaseContainer>
        <PostList posts={posts} isFetching={postsInfiniteQuery.isFetchingNextPage} />
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
