import { useParams } from "react-router-dom";
import Post from "../components/post/Post";
import NotFound from "./NotFound";
import usePostDetailQuery from "../hooks/queries/posts/usePostDetailQuery";
import { Container, Flex, Skeleton, Text } from "@chakra-ui/react";

export default function PostDetail() {
  const { postId } = useParams();

  const { data: post, error, isLoading, isError } = usePostDetailQuery(postId);

  if (isLoading) {
    return (
      <Container maxW="container.lg">
        <Flex direction="column" rowGap={6}>
          <Flex direction="column" rowGap={4}>
            <Skeleton h={7} />
            <Skeleton h={7} />
          </Flex>
          <Flex direction="column" rowGap={4}>
            <Skeleton h={7} />
            <Skeleton h={5} />
            <Skeleton h={5} />
          </Flex>
        </Flex>
      </Container>
    );
  }

  if (isError) {
    if (error.response?.status === 404) {
      return <NotFound />;
    }
    return <Text>블로그 포스트를 불러오는 중 문제가 생겼습니다</Text>;
  }

  return (
    <Container maxW="container.lg">
      <Post post={post} />
    </Container>
  );
}
