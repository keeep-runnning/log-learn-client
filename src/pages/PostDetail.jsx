import { useParams } from "react-router-dom";
import { css } from "@emotion/react";

import Post from "../components/post/Post";
import NotFound from "./NotFound";
import usePostDetailQuery from "../hooks/queries/posts/usePostDetailQuery";

const PostDetail = () => {
  const { username: authorName, postId } = useParams();

  const { data: post, error, isLoading, isError } = usePostDetailQuery(postId);

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
