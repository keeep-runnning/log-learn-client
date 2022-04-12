import { useCallback, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { Editor } from "@toast-ui/react-editor";
import PropTypes from "prop-types";

import DefaultButton from "../common/buttons/DefaultButton";
import PostForm from "./PostForm";
import PostTitleTextArea from "./PostTitleTextArea";
import PrimaryButton from "../common/buttons/PrimaryButton";

const PostEditForm = ({ editableData, onClose }) => {
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: {
      title: editableData.title
    }
  });
  const editorRef = useRef();

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const handlePostEdit = useCallback(handleSubmit((data) => {
    const { title } = data;
    const content = editorRef.current.getInstance().getMarkdown();
    console.log("onPostEditFormSubmitted", { title, content });
  }), []);

  return (
    <PostForm onSubmit={handlePostEdit}>
      <ul css={theme => css`
        display: flex;
        justify-content: flex-end;
        column-gap: ${theme.spacing[2]};
      `}>
        <li>
          <DefaultButton type="button" onClick={onClose}>나가기</DefaultButton>
        </li>
        <li>
          <PrimaryButton type="submit">글 수정하기</PrimaryButton>
        </li>
      </ul>
      <PostTitleTextArea placeholder="제목을 입력하세요." rows={1}
        {...register("title", { required: true })} />
      <div css={css`flex-grow: 1;`}>
        <Editor
          initialValue={editableData.content}
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
    </PostForm>
  );
};

PostEditForm.propTypes = {
  editableData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default PostEditForm;
