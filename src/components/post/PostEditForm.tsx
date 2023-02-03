import { Button, ButtonGroup, Flex, Textarea } from "@chakra-ui/react";

type PostEditFormProps = {
  post: {
    id: number;
    title: string;
    content: string;
  };
  onClose: () => void;
};

export default function PostEditForm({ post, onClose }: PostEditFormProps) {
  return (
    <Flex as="form" direction="column" rowGap={4}>
      <ButtonGroup size="sm" justifyContent="flex-end">
        <Button type="button" onClick={onClose}>
          나가기
        </Button>
        <Button type="submit" colorScheme="main" loadingText="수정 중...">
          글 수정하기
        </Button>
      </ButtonGroup>
      <Textarea
        fontSize="2xl"
        resize="none"
        placeholder="제목을 입력하세요"
        rows={1}
        variant="flushed"
      />
    </Flex>
  );
}
