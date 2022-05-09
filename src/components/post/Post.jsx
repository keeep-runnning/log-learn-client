import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { css, keyframes } from "@emotion/react";
import { Viewer } from "@toast-ui/react-editor";
import PropTypes from "prop-types";

import DefaultButton from "../common/buttons/DefaultButton";
import PostEditForm from "./PostEditForm";
import useCurrentUser from "../../hooks/useCurrentUser";

const SLIDE_ANIMATION_TIME_IN_MS = 200;

const slideUpAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const Post = ({ post }) => {
  const viewerRef = useRef();
  const currentUser = useCurrentUser();
  const [isEditFormDisplayed, setIsEditFormDisplayed] = useState(false);
  const [isEditFormClosing, setIsEditFormClosing] = useState(false);

  useEffect(() => {
    viewerRef.current.getInstance().setMarkdown(post.content);
  }, [post]);

  useEffect(() => {
    if(isEditFormClosing) {
      const timerId = setTimeout(() => {
        setIsEditFormDisplayed(false);
        setIsEditFormClosing(false);
      }, SLIDE_ANIMATION_TIME_IN_MS);

      return () => {
        clearTimeout(timerId);
      }
    }
  }, [isEditFormClosing]);

  useLayoutEffect(() => {
    if(isEditFormDisplayed) {
      document.body.style.overflowY = "hidden";

      return () => {
        document.body.style.removeProperty("overflow-y");
      };
    }
  }, [isEditFormDisplayed]);

  const displayEditForm = useCallback(() => {
    setIsEditFormDisplayed(true);
  }, []);

  const closeEditForm = useCallback(() => {
    setIsEditFormClosing(true);
  }, []);

  const postData = useMemo(() => ({
    id: post.id,
    title: post.title,
    content: post.content
  }), [post]);

  return (
    <>
      <article css={theme => css`
        display: flex;
        flex-direction: column;
        row-gap: ${theme.spacing[6]};      
      `}>
        <header css={theme => css`
          display: flex;
          flex-direction: column;
          row-gap: ${theme.spacing[4]};
          h1 {
            font-weight: ${theme.textWeight.bold};
            ${theme.textSize["2xl"]}
          }
        `}>
          <h1>{post.title}</h1>
          <div css={theme => css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            ${theme.textSize.sm}
          `}>
            <div>
              <span css={theme => css`font-weight: ${theme.textWeight.bold}`}>
                {post.author}
              </span>
              {" "}&middot;{" "}
              <span css={theme => css`color: ${theme.textColor[2]}`}>
                {post.createdAt}
              </span>
            </div>
            {(currentUser.isLoggedIn && currentUser.username === post.author) && (
              <div css={theme => css`
                display: flex;
                column-gap: ${theme.spacing[2]};
              `}>
                <DefaultButton onClick={displayEditForm}>수정</DefaultButton>
                <DefaultButton>삭제</DefaultButton>
              </div>
            )}
          </div>
        </header>
        <Viewer
          ref={viewerRef}
          initialValue={post.content}
          usageStatistics={false}
        />
      </article>

      {isEditFormDisplayed &&
        <section css={theme => css`
          background-color: ${theme.bgColor[2]};
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: ${slideUpAnimation} ${SLIDE_ANIMATION_TIME_IN_MS}ms ease-in;
          transition: transform ${SLIDE_ANIMATION_TIME_IN_MS}ms ease-in;
          ${isEditFormClosing && css`
            transform: translateY(100%);
          `}
        `}>
          <PostEditForm postData={postData} onClose={closeEditForm} />
        </section>
      }
    </>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string
  }).isRequired
};

export default Post;
