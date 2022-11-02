import { memo } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

const AccountFormHeader = ({ title }) => {
  return (
    <header
      css={(theme) => css`
        text-align: center;
        display: flex;
        flex-direction: column;
        row-gap: ${theme.spacing[4]};
        & a {
          color: ${theme.textColor[3]};
          ${theme.textSize.sm}
        }
        & h1 {
          font-weight: ${theme.textWeight.bold};
          ${theme.textSize["2xl"]}
        }
      `}
    >
      <Link to="/">log learn</Link>
      <h1>{title}</h1>
    </header>
  );
};

AccountFormHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(AccountFormHeader);
