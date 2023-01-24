import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import PropTypes from "prop-types";
import { useRef } from "react";
import { Viewer } from "@toast-ui/react-editor";
import { Link as ReactRouterLink } from "react-router-dom";
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
} from "@chakra-ui/react";

import PostEditForm from "./PostEditForm";
import DateTime from "../common/DateTime";
import pageUrl from "../../utils/pageUrl";

const dummyPost = {
  id: 1,
  author: "post author",
  title: "post title",
  content: "post content",
  createdAt: new Date().toString(),
};

const isAuthor = true;

export default function Post({ postId }) {
  const viewerRef = useRef();

  const {
    isOpen: isEditFormOpen,
    onOpen: onOpenEditForm,
    onClose: onCloseEditForm,
  } = useDisclosure();

  const postToEdit = {
    id: dummyPost.id,
    title: dummyPost.title,
    content: dummyPost.content,
  };

  return (
    <>
      <Flex as="article" direction="column" rowGap={6}>
        <Flex as="header" direction="column" rowGap={4}>
          <Heading as="h1" fontSize="2xl" fontWeight="bold">
            {dummyPost.title}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex columnGap={2} alignItems="center">
              <Link
                as={ReactRouterLink}
                to={pageUrl.getUserHomePageUrl(dummyPost.author)}
                fontWeight="bold"
              >
                {dummyPost.author}
              </Link>
              &middot;
              <DateTime dateTimeStr={dummyPost.createdAt} />
            </Flex>
            {isAuthor && (
              <ButtonGroup size="sm" variant="ghost">
                <Button onClick={onOpenEditForm}>수정</Button>
                <Button colorScheme="red" loadingText="삭제 중...">
                  삭제
                </Button>
              </ButtonGroup>
            )}
          </Flex>
        </Flex>
        <Viewer ref={viewerRef} initialValue={dummyPost.content} usageStatistics={false} />
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
  postId: PropTypes.number.isRequired,
};
