import { Link as ReactRouterLink } from "react-router-dom";
import { Divider, Flex, Heading, Link } from "@chakra-ui/react";

import DateTime from "../DateTime";
import { pagePath } from "../../utils/page";
import usePostDetailQuery from "../../hooks/posts/usePostDetailQuery";
import LoadingMessage from "../LoadingMessage";
import NotFound from "../../pages/NotFound";
import Viewer from "../editor/Viewer";

type PostProps = {
  id: number;
};

export default function PostDetail({ id }: PostProps) {
  const postDetailQuery = usePostDetailQuery(id);

  if (postDetailQuery.data) {
    if (postDetailQuery.data.result === "notFound" || postDetailQuery.data.result === "invalidId") {
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
          </Flex>
        </Flex>
        <Divider />
        <Viewer content={postDetail.content} />
      </Flex>
    );
  }

  return <LoadingMessage />;
}
