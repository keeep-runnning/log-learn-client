import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useCallback, useEffect, useRef } from "react";
import { Viewer } from "@toast-ui/react-editor";
import PropTypes from "prop-types";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import PostEditForm from "./PostEditForm";
import useCurrentUserQuery from "../../hooks/queries/auth/useCurrentUserQuery";
import DateTime from "../common/DateTime";
import pageUrl from "../../utils/pageUrl";
import {
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import usePostRemoval from "../../hooks/queries/posts/usePostRemoval";

export default function Post({ post }) {
  const viewerRef = useRef();

  const currentUser = useCurrentUserQuery();

  const {
    isOpen: isEditFormOpen,
    onOpen: onOpenEditForm,
    onClose: onCloseEditForm,
  } = useDisclosure();

  const postRemoveMutation = usePostRemoval();

  const navigate = useNavigate();

  const toast = useToast();

  const handlePostRemoveButtonClick = useCallback(() => {
    postRemoveMutation.mutate(post, {
      onSuccess: () => {
        toast({
          description: `[${post.title}] 블로그 포스트가 삭제되었습니다`,
          position: "top",
          status: "success",
          isClosable: true,
        });
        navigate(pageUrl.getUserHomePageUrl(post.author), { replace: true });
      },
    });
  }, [post]);

  useEffect(() => {
    viewerRef.current.getInstance().setMarkdown(post.content);
  }, [post.content]);

  const postToEdit = {
    id: post.id,
    title: post.title,
    content: post.content,
  };

  return (
    <>
      <Flex as="article" direction="column" rowGap={6}>
        <Flex as="header" direction="column" rowGap={4}>
          <Heading as="h1" fontSize="2xl" fontWeight="bold">
            {post.title}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex columnGap={2} alignItems="center">
              <Link
                as={ReactRouterLink}
                to={pageUrl.getUserHomePageUrl(post.author)}
                fontWeight="bold"
              >
                {post.author}
              </Link>
              &middot;
              <DateTime dateTimeStr={post.createdAt} />
            </Flex>
            {currentUser.isLoggedIn && currentUser.username === post.author && (
              <ButtonGroup size="sm" variant="ghost">
                <Button onClick={onOpenEditForm}>수정</Button>
                <Button
                  colorScheme="red"
                  isDisabled={postRemoveMutation.isLoading}
                  isLoading={postRemoveMutation.isLoading}
                  loadingText="삭제 중..."
                  onClick={handlePostRemoveButtonClick}
                >
                  삭제
                </Button>
              </ButtonGroup>
            )}
          </Flex>
        </Flex>
        <Viewer ref={viewerRef} initialValue={post.content} usageStatistics={false} />
      </Flex>
      <Drawer isOpen={isEditFormOpen} onClose={onCloseEditForm} placement="bottom" size="full">
        <DrawerOverlay />
        <DrawerContent bgColor="gray.50">
          <DrawerBody>
            <Container maxW="container.xl" p={4}>
              <PostEditForm postData={postToEdit} onClose={onCloseEditForm} />
            </Container>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string,
  }).isRequired,
};
