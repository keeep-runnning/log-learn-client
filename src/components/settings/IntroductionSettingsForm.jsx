import "@toast-ui/editor/dist/toastui-editor.css";
import { useCallback, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useOutletContext } from "react-router-dom";
import useIntroductionSettings from "../../hooks/queries/settings/useIntroductionSettings";
import { Button, ButtonGroup, Flex, useToast } from "@chakra-ui/react";

export default function IntroductionSettingsForm() {
  const { settingsData } = useOutletContext();

  const editorRef = useRef();

  const introductionSettingsMutation = useIntroductionSettings();

  const toast = useToast();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const introduction = editorRef.current.getInstance().getMarkdown();
    introductionSettingsMutation.mutate(introduction, {
      onSuccess: () => {
        toast({
          description: "소개가 수정되었습니다",
          position: "top",
          status: "success",
          isClosable: true,
        });
      },
    });
  }, []);

  return (
    <Flex as="form" onSubmit={handleSubmit} direction="column" rowGap={4}>
      <ButtonGroup size="sm" justifyContent="flex-end">
        <Button
          type="submit"
          colorScheme="main"
          isDisabled={introductionSettingsMutation.isLoading}
          isLoading={introductionSettingsMutation.isLoading}
          loadingText="수정 중..."
        >
          수정하기
        </Button>
      </ButtonGroup>
      <Editor
        initialValue={settingsData.introduction}
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
