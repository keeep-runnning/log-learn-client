import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { PostDetail } from "../../types/posts";
import usePostRemoval from "../../hooks/posts/usePostRemoval";
import { pagePath } from "../../utils/page";
import useHandleUnauthenticated from "../../hooks/auth/useHandleUnauthenticated";

type PostRemovalAlertDialogProps = {
  post: PostDetail;
  isOpen: boolean;
  onClose: () => void;
};

export default function PostRemovalAlertDialog({
  post,
  isOpen,
  onClose,
}: PostRemovalAlertDialogProps) {
  const toast = useToast();

  const navigate = useNavigate();

  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const handleUnauthenticated = useHandleUnauthenticated();

  const postRemovalMutation = usePostRemoval(post);

  const handleClickRemoveButton = () => {
    postRemovalMutation.mutate(undefined, {
      onSuccess: (mutationResult) => {
        switch (mutationResult.status) {
          case "removed": {
            toast({
              description: `블로그 포스트(${post.title})를 삭제했습니다`,
              status: "success",
              position: "top",
              isClosable: true,
            });
            navigate(pagePath.getBlog(post.author.name), { replace: true });
            break;
          }
          case "unauthenticated": {
            handleUnauthenticated();
            break;
          }
          case "notFound": {
            toast({
              description: "이미 삭제된 블로그 포스트입니다",
              status: "error",
              position: "top",
              isClosable: true,
            });
            onClose();
            break;
          }
          default: {
            throw new Error(`unexpected result of removing the post: ${mutationResult.status}`);
          }
        }
      },
    });
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelButtonRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading fontSize="2xl">블로그 포스트 삭제</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>
              블로그 포스트(<Text as="strong">{post.title}</Text>)를 삭제합니다.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup variant="ghost" size="sm">
              <Button type="button" onClick={onClose}>
                취소
              </Button>
              <Button
                type="button"
                onClick={handleClickRemoveButton}
                loadingText="삭제 중..."
                isLoading={postRemovalMutation.isLoading}
                colorScheme="red"
              >
                삭제
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
