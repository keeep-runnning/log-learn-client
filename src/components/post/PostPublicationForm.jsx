import "@toast-ui/editor/dist/toastui-editor.css";

import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

import PrimaryButton from "../common/buttons/PrimaryButton";
import PostTitleTextArea from "./PostTitleTextArea";
import PostForm from "./PostForm";
import DefaultButton from "../common/buttons/DefaultButton";
import useCurrentUserQuery from "../../hooks/queries/auth/useCurrentUserQuery";
import usePostPublication from "../../hooks/queries/posts/usePostPublication";

const PostPublicationForm = () => {
  const navigate = useNavigate();
  const editorRef = useRef();
  const { register, handleSubmit, setFocus } = useForm();
  const currentUser = useCurrentUserQuery();

  useEffect(() => {
    if(!currentUser.isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [currentUser]);

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const postPublicationMutation = usePostPublication();

  const handlePostPublication = useCallback(handleSubmit((data) => {
    const { title } = data;
    const content = editorRef.current.getInstance().getMarkdown();
    postPublicationMutation.mutate({ title, content }, {
      onSuccess: ({ author, id: postId }) => {
        navigate(`/@${author}/posts/${postId}`);
      }
    });
  }), []);

  const handleGoBackButtonClick = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <PostForm onSubmit={handlePostPublication}>
      <ul css={theme => css`
        display: flex;
        justify-content: flex-end;
        column-gap: ${theme.spacing[2]};
      `}>
        <li>
          <DefaultButton onClick={handleGoBackButtonClick} type="button">
            뒤로가기
          </DefaultButton>
        </li>
        <li>
          <PrimaryButton disabled={postPublicationMutation.isLoading} type="submit">
            글 발행하기
          </PrimaryButton>
        </li>
      </ul>
      <PostTitleTextArea {...register("title", {required: true})} placeholder="제목을 입력하세요." rows={1} />
      <div css={css`flex-grow: 1;`}>
        <Editor
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

export default PostPublicationForm;
