import "@toast-ui/editor/dist/toastui-editor.css";

import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@toast-ui/react-editor";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

import { publishPost } from "../apis/posts";
import { fetchCurrentUser } from "../apis/users";
import PrimaryButton from "./buttons/PrimaryButton";
import PostTitleTextArea from "./PostTitleTextArea";
import PostForm from "./PostForm";
import DefaultButton from "./buttons/DefaultButton";

const PostPublicationForm = () => {
  const navigate = useNavigate();
  const editorRef = useRef();
  const { register, handleSubmit, setFocus } = useForm();

  const { data: currentUser, isSuccess } = useQuery("currentUser", fetchCurrentUser);

  useEffect(() => {
    if(isSuccess && !currentUser.isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isSuccess, currentUser]);

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const postPublicationMutation = useMutation(publishPost, {
    onSuccess: ({author, id: postId}) => {
      navigate(`/@${author}/posts/${postId}`);
    }
  });

  const handlePostPublication = useCallback(handleSubmit((data) => {
    const { title } = data;
    const content = editorRef.current.getInstance().getMarkdown();
    postPublicationMutation.mutate({title, content});
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
