import "@toast-ui/editor/dist/toastui-editor.css";

import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@toast-ui/react-editor";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { publishPost } from "../apis/posts";
import { fetchCurrentUser } from "../apis/users";
import PrimaryButton from "./buttons/PrimaryButton";

const PostTitleTextArea = styled.textarea`
  resize: none;
  background-color: transparent;
  border: 0;
  outline: 0;
  ${({ theme }) => css`
    padding: ${theme.spacing[1]} ${theme.spacing[2]};
    ${theme.textSize["2xl"]};
    &::placeholder {
      color: ${theme.textColor[2]};
    }
  `}
`;

const RowButtonList = styled.ul`
  display: flex;
  justify-content: flex-end;
`;

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

  return (
    <form onSubmit={handlePostPublication}
          css={theme => css`
            height: 100%;
            padding: ${theme.spacing[4]};
            display: flex;
            flex-direction: column;
            row-gap: ${theme.spacing[4]};
            ${theme.mq.md} {
              padding: ${theme.spacing[6]};
              row-gap: ${theme.spacing[6]};
            }
          `}
    >
      <RowButtonList>
        <PrimaryButton disabled={postPublicationMutation.isLoading} type="submit">
          글 발행하기
        </PrimaryButton>
      </RowButtonList>
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
    </form>
  );
};

export default PostPublicationForm;
