import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import PostListItem from "./PostListItem";
import usePostsByAuthorInfiniteQuery from "../../hooks/queries/posts/usePostsByAuthorInfiniteQuery";
import { Box, Center, Skeleton, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";

export default function PostList() {
  const targetRef = useRef();

  const { userData } = useOutletContext();

  const { isLoading, isError, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    usePostsByAuthorInfiniteQuery(userData.username);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const [target] = entries;
        if (target.isIntersecting) {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }
      },
      {
        rootMargin: "200px 0px",
      }
    );
    io.observe(targetRef.current);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <>
      {isLoading ? (
        <VStack alignItems="stretch" spacing={6} divider={<StackDivider borderColor="gray.300" />}>
          <Stack>
            <Skeleton h={5} />
            <Skeleton h={5} />
          </Stack>
          <Stack>
            <Skeleton h={5} />
            <Skeleton h={5} />
          </Stack>
          <Stack>
            <Skeleton h={5} />
            <Skeleton h={5} />
          </Stack>
        </VStack>
      ) : isError ? (
        <Text>블로그 포스트 목록을 가져오는 데 문제가 발생했습니다</Text>
      ) : data.pages.length === 1 && data.pages[0].posts.length === 0 ? (
        <Center h={16} textAlign="center">
          <Text color="gray.500" fontSize="lg">
            작성된 블로그 포스트가 없습니다
          </Text>
        </Center>
      ) : (
        <VStack alignItems="stretch" spacing={6} divider={<StackDivider borderColor="gray.300" />}>
          {data.pages.map((page, idx) =>
            page.posts.length > 0 ? (
              <VStack
                key={idx}
                alignItems="stretch"
                spacing={6}
                divider={<StackDivider borderColor="gray.300" />}
              >
                {page.posts.map((post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </VStack>
            ) : null
          )}
        </VStack>
      )}
      <Box ref={targetRef} />
    </>
  );
}
