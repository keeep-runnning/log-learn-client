import "@toast-ui/editor/dist/toastui-editor.css";

import { useCallback, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import { css } from "@emotion/react";
import { useOutletContext } from "react-router-dom";

import PrimaryButton from "../common/buttons/PrimaryButton";
import useIntroductionSettings from "../../hooks/queries/settings/useIntroductionSettings";
import useNotifications from "../../hooks/useNotifications";

const IntroductionSettingsForm = () => {
  const { settingsData } = useOutletContext();

  const editorRef = useRef();

  const introductionSettingsMutation = useIntroductionSettings();

  const { notifySuccess } = useNotifications();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const introduction = editorRef.current.getInstance().getMarkdown();
    introductionSettingsMutation.mutate(introduction, {
      onSuccess: () => {
        notifySuccess({ content: "소개가 수정되었습니다." });
      },
    });
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      css={(theme) => css`
        padding: ${theme.spacing[2]};
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        row-gap: ${theme.spacing[4]};
        & > div {
          width: 100%;
          min-height: 320px;
          flex-grow: 1;
        }
      `}
    >
      <PrimaryButton type="submit" disabled={introductionSettingsMutation.isLoading}>
        수정하기
      </PrimaryButton>
      <div>
        <Editor
          initialValue={settingsData.introduction}
          autofocus={false}
          ref={editorRef}
          height="100%"
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
      </div>
    </form>
  );
};

export default IntroductionSettingsForm;
