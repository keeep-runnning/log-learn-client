import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { css } from "@emotion/react";
import { Viewer } from "@toast-ui/react-editor";
import PropTypes from "prop-types";

const Post = ({ post }) => {
  return (
    <article
      css={theme => css`
        display: flex;
        flex-direction: column;
        row-gap: ${theme.spacing[6]};      
      `}
    >
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
        <div css={theme => css`${theme.textSize.sm}`}>
          <span css={theme => css`font-weight: ${theme.textWeight.bold}`}>
            {post.author}
          </span>
          {" "}&middot;{" "}
          <span css={theme => css`color: ${theme.textColor[2]}`}>
            {post.createdAt}
          </span>
        </div>
      </header>
      <Viewer
        initialValue={post.content}
        usageStatistics={false}
      />
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};

export default Post;
