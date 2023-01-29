import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Link } from "@chakra-ui/react";

import DateTime from "../common/DateTime";
import pageUrl from "../../utils/pageUrl";

type PostListItemProps = {
  post: {
    id: number;
    authorName: string;
    title: string;
    createdAt: string;
  };
};

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <Flex as="article" direction="column" alignItems="flex-start" rowGap={4} px={2}>
      <Link
        as={ReactRouterLink}
        to={pageUrl.getPostDetailPageUrl(post.id)}
        fontWeight="bold"
        fontSize="2xl"
      >
        {post.title}
      </Link>
      <Flex alignItems="center" columnGap={2}>
        <Link as={ReactRouterLink} to={pageUrl.getUserHomePageUrl(post.authorName)}>
          {post.authorName}
        </Link>
        &middot;
        <DateTime dateTimeStr={post.createdAt} />
      </Flex>
    </Flex>
  );
}
