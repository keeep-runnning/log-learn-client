import { Link as ReactRouterLink } from "react-router-dom";
import { Divider, Flex, Heading, Link } from "@chakra-ui/react";

import DateTime from "../DateTime";
import { pagePath } from "../../utils/page";
import usePostDetailQuery from "../../hooks/posts/usePostDetailQuery";
import LoadingMessage from "../LoadingMessage";
import NotFound from "../../pages/NotFound";
import Viewer from "../editor/Viewer";
import PostControlButtons from "./PostControlButtons";

type PostProps = {
  id: number;
};

export default function PostDetailViewer({ id }: PostProps) {
  const postDetailQuery = usePostDetailQuery(id);

  if (postDetailQuery.data) {
    if (
      postDetailQuery.data.status === "notFound" ||
      postDetailQuery.data.status === "invalidId"
    ) {
      return <NotFound />;
    }

    const { postDetail } = postDetailQuery.data;

    return (
      <Flex as="article" direction="column" rowGap={6}>
        <Flex as="header" direction="column" rowGap={4}>
          <Heading as="h1" fontSize="32px" fontWeight="bold">
            {postDetail.title}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex columnGap={2} alignItems="center">
              <Link
                as={ReactRouterLink}
                to={pagePath.getBlog(postDetail.author.name)}
                fontWeight="bold"
              >
                {postDetail.author.name}
              </Link>
              &middot;
              <DateTime dateTime={postDetail.createdAt} />
            </Flex>
            <PostControlButtons post={postDetail} />
          </Flex>
        </Flex>
        <Divider />
        <Viewer
          content={postDetail.content}
          defaultMessage="블로그 포스트 내용이 작성되지 않았습니다"
        />
      </Flex>
    );
  }

  return <LoadingMessage />;
}
