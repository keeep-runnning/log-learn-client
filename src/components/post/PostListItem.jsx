import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

const PostListItem = ({ postId, authorName, title, preview, createdAt }) => {
  return (
    <article css={theme => css`
      padding-left: ${theme.spacing[2]};
      padding-right: ${theme.spacing[2]};
      display: flex;
      flex-direction: column;
      row-gap: ${theme.spacing[4]};
      h2 {
        font-weight: ${theme.textWeight.bold};
        ${theme.textSize.lg}
      }
      p {
        ${theme.textSize.base}
      }
    `}>
      <Link to={`/@${authorName}/posts/${postId}`}>
        <h2>{title}</h2>
      </Link>
      <p>{preview.slice(0, 100)}</p>
      <span css={theme => css`
        color: ${theme.textColor[2]};
        ${theme.textSize.sm}
      `}>
        {createdAt}
      </span>
    </article>
  );
};

PostListItem.propTypes = {
  postId: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default PostListItem;
