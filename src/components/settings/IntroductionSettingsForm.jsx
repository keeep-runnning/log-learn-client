import "@toast-ui/editor/dist/toastui-editor.css";

import { useCallback, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

import PrimaryButton from "../common/buttons/PrimaryButton";
import useIntroductionSettings from "../../hooks/queries/settings/useIntroductionSettings";

const IntroductionSettingsForm = ({ data }) => {
  const editorRef = useRef();

  const introductionSettingsMutation = useIntroductionSettings();

  const handleSubmit = useCallback(event => {
    event.preventDefault();
    const introduction = editorRef.current.getInstance().getMarkdown();
    introductionSettingsMutation.mutate(introduction);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      css={theme => css`
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
      <PrimaryButton type="submit" disabled={introductionSettingsMutation.isLoading}>수정하기</PrimaryButton>
      <div>
        <Editor
          initialValue={data}
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
            ["code", "codeblock"]
          ]}
          useCommandShortcut={true}
          usageStatistics={false}
        />
      </div>
    </form>
  );
};

IntroductionSettingsForm.propTypes = {
  data: PropTypes.string.isRequired
};

export default IntroductionSettingsForm;
