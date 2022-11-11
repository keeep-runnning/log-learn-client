import { Link as ReactRouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import DateTime from "../common/DateTime";
import pageUrl from "../../utils/pageUrl";
import { Flex, Link } from "@chakra-ui/react";

export default function PostListItem({ post }) {
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
        <Link as={ReactRouterLink} to={pageUrl.getUserHomePageUrl(post.author)}>
          {post.author}
        </Link>
        &middot;
        <DateTime dateTimeStr={post.createdAt} />
      </Flex>
    </Flex>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
