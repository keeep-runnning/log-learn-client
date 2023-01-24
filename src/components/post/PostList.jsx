import { StackDivider, VStack } from "@chakra-ui/react";

import PostListItem from "./PostListItem";

const dummyPosts = [
  {
    id: "1",
    author: "test-user",
    title: "post title",
    createdAt: new Date().toString(),
  },
];

export default function PostList() {
  return (
    <VStack alignItems="stretch" spacing={6} divider={<StackDivider borderColor="gray.300" />}>
      {dummyPosts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </VStack>
  );
}
