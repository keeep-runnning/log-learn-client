import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchPost } from "../apis/posts";
import Post from "../components/Post";

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
     <main className="max-w-screen-md mx-auto">
       <Post post={post} />
     </main>
    </>
  );
};

export default PostDetail;
