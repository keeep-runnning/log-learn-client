import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import PropTypes from "prop-types";
import { Button, ButtonGroup, Flex, Textarea } from "@chakra-ui/react";

export default function PostEditForm({ postData, onClose }) {
  const editorRef = useRef();

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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
