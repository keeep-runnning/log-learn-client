import {
  Box,
  Button,
  Flex,
  FormControl,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Editor from "../editor/Editor";
import usePostPublication from "../../hooks/posts/usePostPublication";
import { pagePath } from "../../utils/page";
import useHandleUnauthenticated from "../../hooks/auth/useHandleUnauthenticated";

type PostPublicationFormData = {
  title: string;
  content: string;
};

export default function PostPublicationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostPublicationFormData>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const postPublicationMutation = usePostPublication();

  const navigate = useNavigate();

  const toast = useToast();

  const handleUnauthenticated = useHandleUnauthenticated();

  const onSubmit = ({ title, content }: PostPublicationFormData) => {
    postPublicationMutation.mutate(
      { title, content },
      {
        onSuccess: (postPublicationResult) => {
          if (postPublicationResult.status === "published") {
            navigate(pagePath.getPostDetail(postPublicationResult.newPost.id), {
              replace: true,
            });
          } else if (postPublicationResult.status === "fieldsInvalid") {
            const message = postPublicationResult.fieldErrors
              .filter(({ field }) => ["title", "content"].includes(field))
              .map(({ reason }) => reason)
              .join(". ");
            toast({
              description: message,
              position: "top",
              status: "error",
              isClosable: true,
              duration: 10000,
            });
          } else if (postPublicationResult.status === "unauthenticated") {
            handleUnauthenticated();
          }
        },
      }
    );
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      rowGap={6}
    >
      <Button
        type="submit"
        loadingText="글 발행 중..."
        isLoading={postPublicationMutation.isLoading}
        variant="ghost"
        colorScheme="main"
        alignSelf="flex-end"
      >
        글 발행하기
      </Button>
      <FormControl isInvalid={Boolean(errors.title)}>
        <Textarea
          {...register("title", { required: true })}
          fontSize="32px"
          placeholder="제목을 입력하세요"
          rows={1}
          variant="flushed"
          resize="vertical"
        />
      </FormControl>
      <Box h="640px">
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Editor value={field.value} onChange={field.onChange} />
          )}
        />
      </Box>
    </Flex>
  );
}
