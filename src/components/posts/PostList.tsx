import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Link, Skeleton, StackDivider, Text, VStack } from "@chakra-ui/react";

import { pagePath } from "../../utils/page";
import DateTime from "../DateTime";
import { Post } from "../../hooks/posts/usePostsInfiniteQuery";
import EmptyMessage from "../EmptyMessage";

type PostListProps = {
  posts: Post[];
  isFetching: boolean;
};

export default function PostList({ posts, isFetching }: PostListProps) {
  if (posts.length === 0) {
    return <EmptyMessage message="작성된 포스트가 없습니다" />;
  }

  return (
    <VStack alignItems="stretch" spacing={6} divider={<StackDivider borderColor="gray.300" />}>
      {posts.map((post) => (
        <Flex key={post.id} direction="column" rowGap={4} px={2}>
          <Link
            as={ReactRouterLink}
            to={pagePath.getPostDetail(post.id)}
            fontWeight="bold"
            fontSize="2xl"
          >
            {post.title}
          </Link>
          <DateTime dateTime={post.createdAt} />
        </Flex>
      ))}
      {isFetching ? (
        <Flex direction="column" rowGap={4} px={2}>
          <Skeleton>
            <Text fontWeight="bold" fontSize="2xl">
              post title
            </Text>
          </Skeleton>
          <Skeleton>
            <Text fontSize="sm">post created at</Text>
          </Skeleton>
        </Flex>
      ) : null}
    </VStack>
  );
}
