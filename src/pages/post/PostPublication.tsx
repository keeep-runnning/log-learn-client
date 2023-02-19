import { Box, Container } from "@chakra-ui/react";
import PostPublicationForm from "../../components/post/PostPublicationForm";

export default function PostPublication() {
  return (
    <Box minH="100vh" bgColor="gray.50">
      <Container py={4} maxW="container.xl">
        <PostPublicationForm />
      </Container>
    </Box>
  );
}
