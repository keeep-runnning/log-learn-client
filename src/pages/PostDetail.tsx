import { useParams } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import Post from "../components/post/Post";

export default function PostDetail() {
  const params = useParams();

  return (
    <Container maxW="container.lg">
      <Post postId={Number(params.postId)} />
    </Container>
  );
}
