import { css } from "@emotion/react";
import PropTypes from "prop-types";

const FormFieldErrorMessage = ({ message }) => {
  if(!message) {
    return null;
  }

  return (
    <p css={theme => css`
      color: ${theme.dangerColor[3]};
      padding: ${theme.spacing[1]};
      font-weight: ${theme.textWeight.bold};
      ${theme.textSize.xs}
    `}>
      {message}
    </p>
  );
};

FormFieldErrorMessage.propTypes = {
  message: PropTypes.string
};

export default FormFieldErrorMessage;
