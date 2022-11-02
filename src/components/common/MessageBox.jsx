import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { memo } from "react";

const MessageBox = ({ message }) => {
  return (
    <div
      css={(theme) => css`
        text-align: center;
        padding: ${theme.spacing[6]} ${theme.spacing[2]};
        ${theme.textSize.lg}
        color: ${theme.textColor[2]};
      `}
    >
      {message}
    </div>
  );
};

MessageBox.propTypes = {
  message: PropTypes.string.isRequired,
};

export default memo(MessageBox);
