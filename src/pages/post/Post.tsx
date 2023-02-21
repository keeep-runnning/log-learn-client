import { useParams } from "react-router-dom";

import BaseContainer from "../BaseContainer";
import PostDetail from "../../components/post/PostDetail";
import NotFound from "../NotFound";

export default function Post() {
  const params = useParams();
  const postId = Number(params.postId!);

  return (
    <BaseContainer>
      {Number.isInteger(postId) ? <PostDetail id={postId} /> : <NotFound />}
    </BaseContainer>
  );
}
