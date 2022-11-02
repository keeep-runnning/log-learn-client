import { memo } from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import { IoClose, IoWarning } from "react-icons/io5";

import Button from "./buttons/Button";

const AlertMessage = ({ message, onCloseButtonClicked }) => {
  return (
    <div
      css={(theme) => css`
        display: flex;
        align-items: center;
        column-gap: ${theme.spacing[2]};
        background-color: ${theme.warningColor[1]};
        border: ${theme.lineThickness[1]} solid ${theme.warningColor[2]};
        padding: ${theme.spacing[2]};
        ${theme.borderRound.normal}
      `}
    >
      <div
        css={(theme) => css`
          padding: ${theme.spacing[1]};
          color: ${theme.textColor[1]};
          background-color: ${theme.warningColor[3]};
          ${theme.borderRound.normal}
        `}
      >
        <IoWarning size={24} />
      </div>
      <p
        css={(theme) => css`
          flex-grow: 1;
          font-weight: ${theme.textWeight.bold};
          ${theme.textSize.xs}
        `}
      >
        {message}
      </p>
      <Button
        onClick={onCloseButtonClicked}
        css={(theme) => css`
          display: flex;
          justify-content: center;
          align-items: center;
          ${theme.borderRound.full}
          &:hover {
            background-color: ${theme.warningColor[3]};
          }
        `}
      >
        <IoClose size={16} />
      </Button>
    </div>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onCloseButtonClicked: PropTypes.func.isRequired,
};

export default memo(AlertMessage);
