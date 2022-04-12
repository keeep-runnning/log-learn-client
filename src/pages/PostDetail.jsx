import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { css } from "@emotion/react";

import { fetchPost } from "../apis/posts";
import Post from "../components/post/Post";

const PostDetail = () => {
  const { username: author, postId } = useParams();

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
    if(error.response?.data) {
      return (
        <div>{error.response?.data.errorMessage}</div>
      );
    }
    return null;
  }

  return (
    <>
     <main css={theme => css`
       padding: ${theme.spacing[4]};
       ${theme.mq.md} {
         max-width: ${theme.bp.md};
         margin: 0 auto;
       }
     `}>
       <Post post={post} />
     </main>
    </>
  );
};

export default PostDetail;
