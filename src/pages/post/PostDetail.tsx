import { useParams } from "react-router-dom";

import Post from "../../components/post/Post";
import BaseContainer from "../BaseContainer";

export default function PostDetail() {
  const params = useParams();

  return (
    <BaseContainer>
      <Post postId={Number(params.postId)} />
    </BaseContainer>
  );
}
