import { Button, ButtonGroup, Skeleton, useDisclosure } from "@chakra-ui/react";

import { PostDetail } from "../../hooks/posts/PostDetail";
import useMeQuery from "../../hooks/auth/useMeQuery";
import PostEditFormDrawer from "./PostEditFormDrawer";

type PostControlButtonsProps = {
  post: PostDetail;
};

export default function PostControlButtons({ post }: PostControlButtonsProps) {
  const meQuery = useMeQuery();

  const {
    isOpen: isEditFormOpen,
    onOpen: onOpenEditForm,
    onClose: onCloseEditForm,
  } = useDisclosure();

  if (meQuery.data) {
    const hasControl = meQuery.data.isLoggedIn && meQuery.data.id === post.author.id;

    if (!hasControl) {
      return null;
    }

    return (
      <>
        <ButtonGroup size="sm" variant="ghost">
          <Button colorScheme="main" onClick={onOpenEditForm}>
            수정
          </Button>
          <Button colorScheme="red">삭제</Button>
        </ButtonGroup>
        <PostEditFormDrawer post={post} isOpen={isEditFormOpen} onClose={onCloseEditForm} />
      </>
    );
  }

  return (
    <ButtonGroup size="sm" variant="ghost">
      <Skeleton>
        <Button colorScheme="main">수정</Button>
      </Skeleton>
      <Skeleton>
        <Button colorScheme="red">삭제</Button>
      </Skeleton>
    </ButtonGroup>
  );
}
