import "@toast-ui/editor/dist/toastui-editor.css";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@toast-ui/react-editor";
import PropTypes from "prop-types";
import usePostEdit from "../../hooks/queries/posts/usePostEdit";
import { Button, ButtonGroup, Flex, Textarea } from "@chakra-ui/react";

export default function PostEditForm({ postData, onClose }) {
  const editorRef = useRef();

  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: {
      title: postData.title,
    },
  });

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const editMutation = usePostEdit();

  const editPost = useCallback(
    ({ title }) => {
      const content = editorRef.current.getInstance().getMarkdown();
      editMutation.mutate(
        {
          postId: postData.id,
          title,
          content,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    },
    [postData.id]
  );

  return (
    <Flex as="form" onSubmit={handleSubmit(editPost)} direction="column" rowGap={4}>
      <ButtonGroup size="sm" justifyContent="flex-end">
        <Button type="button" onClick={onClose}>
          나가기
        </Button>
        <Button
          type="submit"
          colorScheme="main"
          isDisabled={editMutation.isLoading}
          isLoading={editMutation.isLoading}
          loadingText="수정 중..."
        >
          글 수정하기
        </Button>
      </ButtonGroup>
      <Textarea
        {...register("title", { required: true })}
        fontSize="2xl"
        resize="none"
        placeholder="제목을 입력하세요"
        rows={1}
        variant="flushed"
      />
      <Editor
        initialValue={postData.content}
        autofocus={false}
        ref={editorRef}
        height="720px"
        previewStyle="vertical"
        initialEditType="wysiwyg"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "link"],
          ["code", "codeblock"],
        ]}
        useCommandShortcut={true}
        usageStatistics={false}
      />
    </Flex>
  );
}

PostEditForm.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
