import { useParams } from "react-router-dom";

import BaseContainer from "../../components/BaseContainer";
import PostDetailViewer from "../../components/posts/PostDetailViewer";
import NotFound from "../NotFound";

export default function PostDetail() {
  const params = useParams();
  const postId = Number(params.postId!);

  return (
    <BaseContainer>
      {Number.isInteger(postId) ? <PostDetailViewer id={postId} /> : <NotFound />}
    </BaseContainer>
  );
}
