import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

import DateTime from "../common/DateTime";

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
      <Link to={`/@${authorName}/posts/${postId}`} css={theme => css`
        font-weight: ${theme.textWeight.bold};
        ${theme.textSize.lg}
        &:hover {
          text-decoration: underline;
        }
      `}>
        {title}
      </Link>
      <p>{preview.slice(0, 100)}</p>
      <div css={theme => css`
        display: flex;
        align-items: center;
        column-gap: ${theme.spacing[2]};
      `}>
        <Link to={`/@${authorName}`} css={theme => css`
          ${theme.textSize.sm}
          font-weight: ${theme.textWeight.bold};
          &:hover {
            text-decoration: underline;
          }
        `}>
          {authorName}
        </Link>
        &middot;
        <DateTime dateTimeStr={createdAt} />
      </div>
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
