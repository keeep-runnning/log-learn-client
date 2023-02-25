import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  Heading,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

import { PostDetail } from "../../hooks/posts/PostDetail";
import usePostEdit from "../../hooks/posts/usePostEdit";
import BaseContainer from "../../pages/BaseContainer";
import Editor from "../editor/Editor";
import useHandleUnauthenticatedError from "../../hooks/auth/useHandleUnauthenticatedError";

type PostEditFormDrawerProps = {
  post: PostDetail;
  isOpen: boolean;
  onClose: () => void;
};

type PostEditFormData = {
  title: string;
  content: string;
};

export default function PostEditFormDrawer({ post, onClose, isOpen }: PostEditFormDrawerProps) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PostEditFormData>({
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const handleUnauthenticated = useHandleUnauthenticatedError();

  const postEditMutation = usePostEdit();

  const handleClickCloseButton = () => {
    reset();
    onClose();
  };

  const onSubmit = (formData: PostEditFormData) => {
    postEditMutation.mutate(
      { id: post.id, title: formData.title, content: formData.content },
      {
        onSuccess: (mutationResult) => {
          switch (mutationResult.result) {
            case "edited": {
              const { title, content } = mutationResult.editedPost;
              reset({ title, content });

              toast({
                description: "블로그 포스트가 수정되었습니다",
                status: "success",
                position: "top",
                isClosable: true,
              });

              break;
            }
            case "fieldsInvalid": {
              const message = mutationResult.fieldErrors
                .filter(({ field }) => field === "title" || field === "content")
                .map(({ reason }) => reason)
                .join(". ");

              toast({
                description: message,
                status: "error",
                position: "top",
                isClosable: true,
              });
              break;
            }
            case "unauthenticated": {
              handleUnauthenticated();
              break;
            }
            default: {
              throw new Error(`Unexpected result of editing post: ${mutationResult.result}`);
            }
          }
        },
      }
    );
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleClickCloseButton} placement="bottom" size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <BaseContainer>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading as="h1" fontSize="2xl">
                블로그 포스트 수정
              </Heading>
              <ButtonGroup size="sm" variant="ghost" justifyContent="flex-end">
                <Button type="button" onClick={handleClickCloseButton}>
                  나가기
                </Button>
                <Button
                  type="submit"
                  form="edit-post"
                  loadingText="수정 중..."
                  isLoading={postEditMutation.isLoading}
                  colorScheme="main"
                >
                  글 수정하기
                </Button>
              </ButtonGroup>
            </Flex>
          </BaseContainer>
        </DrawerHeader>
        <DrawerBody>
          <BaseContainer>
            <Flex
              id="edit-post"
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              direction="column"
              rowGap={8}
            >
              <FormControl isInvalid={Boolean(errors.title)}>
                <Textarea
                  {...register("title", { required: true })}
                  fontSize="32px"
                  resize="vertical"
                  placeholder="제목을 입력하세요"
                  rows={1}
                  variant="flushed"
                />
              </FormControl>
              <Box h="640px">
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                />
              </Box>
            </Flex>
          </BaseContainer>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
