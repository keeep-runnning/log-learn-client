import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { css } from "@emotion/react";

import { fetchPost } from "../apis";
import Post from "../components/post/Post";
import NotFound from "./NotFound";

const PostDetail = () => {
  const { username: authorName, postId } = useParams();

  const { data: post, error, isLoading, isError } = useQuery(
    ["post", postId],
    ({queryKey}) => fetchPost(queryKey[1]),
    {
      retry: (failureCount, error) => error.response?.status !== 404 && failureCount <= 3
    }
  );

  if(isLoading) {
    return <div>loading...</div>
  }

  if(isError) {
    if(error.response?.status === 404) {
      return <NotFound />;
    }
    return null;
  }

  if(post.author !== authorName) {
    return <NotFound />;
  }

  return (
    <main css={theme => css`
      padding: ${theme.spacing[4]};
      ${theme.mq.md} {
        max-width: ${theme.bp.md};
        margin: 0 auto;
      }
    `}>
      <Post post={post} />
    </main>
  );
};

export default PostDetail;
