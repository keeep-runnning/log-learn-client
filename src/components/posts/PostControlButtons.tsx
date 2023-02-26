import { Button, ButtonGroup, Skeleton, useDisclosure } from "@chakra-ui/react";

import { PostDetail } from "../../types/posts";
import useMeQuery from "../../hooks/auth/useMeQuery";
import PostEditFormDrawer from "./PostEditFormDrawer";
import PostRemovalAlertDialog from "./PostRemovalAlertDialog";

type PostControlButtonsProps = {
  post: PostDetail;
};

export default function PostControlButtons({ post }: PostControlButtonsProps) {
  const { data } = useMeQuery();

  const {
    isOpen: isEditFormOpen,
    onOpen: onOpenEditForm,
    onClose: onCloseEditForm,
  } = useDisclosure();

  const {
    isOpen: isRemovalDialogOpen,
    onOpen: onOpenRemovalDialog,
    onClose: onCloseRemovalDialog,
  } = useDisclosure();

  if (data) {
    const hasControl = data.status === "loggedIn" && data.myProfile.id === post.author.id;

    if (!hasControl) {
      return null;
    }

    return (
      <>
        <ButtonGroup size="sm" variant="ghost">
          <Button type="button" onClick={onOpenEditForm} colorScheme="main">
            수정
          </Button>
          <Button type="button" onClick={onOpenRemovalDialog} colorScheme="red">
            삭제
          </Button>
        </ButtonGroup>
        <PostEditFormDrawer post={post} isOpen={isEditFormOpen} onClose={onCloseEditForm} />
        <PostRemovalAlertDialog
          post={post}
          isOpen={isRemovalDialogOpen}
          onClose={onCloseRemovalDialog}
        />
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
