import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Link, StackDivider, VStack } from "@chakra-ui/react";

import { pagePath } from "../../utils/page";
import DateTime from "../common/DateTime";
import { Post } from "../../hooks/usePostsInfiniteQuery";

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
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
    </VStack>
  );
}
