import "@toast-ui/editor/dist/toastui-editor.css";

import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@toast-ui/react-editor";
import { useMutation, useQuery } from "react-query";
import { useNavigate, Navigate } from "react-router-dom";

import { publishPost } from "../apis/posts";
import { fetchCurrentUser } from "../apis/users";

const PostPublicationForm = () => {
  const navigate = useNavigate();
  const editorRef = useRef();
  const { register, handleSubmit, setFocus } = useForm();

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

  const { data: currentUser, isSuccess } = useQuery("currentUser", fetchCurrentUser);

  if(isSuccess && !currentUser.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <form onSubmit={handlePostPublication}
          className="h-full md:w-11/12 md:mx-auto flex flex-col gap-y-4 px-2 py-4"
    >
      <div className="flex justify-end">
        <button disabled={postPublicationMutation.isLoading} type="submit" className="btn btn-indigo">
          글 발행하기
        </button>
      </div>
      <section className="grow flex flex-col gap-y-6">
        <input {...register("title", {required: true})}
               type="text" placeholder="제목을 입력하세요."
               className="bg-transparent mx-1 pb-3 text-xl focus:outline-none focus:border-b-2 focus:border-b-gray-200"
        />
        <div className="grow">
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
      </section>
    </form>
  );
};

export default PostPublicationForm;
