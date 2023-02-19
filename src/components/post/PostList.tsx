import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Link, StackDivider, VStack } from "@chakra-ui/react";

import { pagePath } from "../../utils/page";
import DateTime from "../common/DateTime";

type PostListItem = {
  id: number;
  title: string;
  createdAt: Date;
  author: {
    id: number;
    name: string;
  };
};

type PostListProps = {
  posts: PostListItem[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <VStack alignItems="stretch" spacing={6} divider={<StackDivider borderColor="gray.300" />}>
      {posts.map((post) => (
        <Flex as="article" direction="column" alignItems="flex-start" rowGap={4} px={2}>
          <Link
            as={ReactRouterLink}
            to={pagePath.getPostDetail(post.id)}
            fontWeight="bold"
            fontSize="2xl"
          >
            {post.title}
          </Link>
          <Flex alignItems="center" columnGap={2}>
            <Link as={ReactRouterLink} to={pagePath.getBlog(post.author.name)}>
              {post.author.name}
            </Link>
            &middot;
            <DateTime dateTime={post.createdAt} />
          </Flex>
        </Flex>
      ))}
    </VStack>
  );
}
