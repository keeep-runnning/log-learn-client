import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

export default function IntroductionSettingsForm() {
  const editorRef = useRef<Editor>(null);

  return (
    <Flex as="form" direction="column" rowGap={4}>
      <ButtonGroup size="sm" justifyContent="flex-end">
        <Button type="submit" colorScheme="main" loadingText="수정 중...">
          수정하기
        </Button>
      </ButtonGroup>
      <Editor
        autofocus={false}
        ref={editorRef}
        height="560px"
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
