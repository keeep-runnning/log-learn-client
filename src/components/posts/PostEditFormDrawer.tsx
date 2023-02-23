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
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

import { PostDetail } from "../../hooks/posts/PostDetail";
import BaseContainer from "../../pages/BaseContainer";
import Editor from "../editor/Editor";

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
  const { register, handleSubmit, control } = useForm<PostEditFormData>({
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const onSubmit = ({ title, content }: PostEditFormData) => {};

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <BaseContainer>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading as="h1" fontSize="2xl">
                블로그 포스트 수정
              </Heading>
              <ButtonGroup size="sm" variant="ghost" justifyContent="flex-end">
                <Button type="button" onClick={onClose}>
                  나가기
                </Button>
                <Button form="edit-post" type="submit" colorScheme="main" loadingText="수정 중...">
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
              rowGap={4}
            >
              <Textarea
                {...register("title")}
                fontSize="32px"
                resize="vertical"
                placeholder="제목을 입력하세요"
                rows={1}
                variant="flushed"
              />
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
