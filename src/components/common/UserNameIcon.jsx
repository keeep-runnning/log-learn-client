import PropTypes from "prop-types";
import { memo } from "react";
import { css } from "@emotion/react";
import { IoPersonCircleSharp } from "react-icons/io5";

const UserNameIcon = ({ username }) => {
  return (
    <div css={theme => css`
      display: flex;
      column-gap: ${theme.spacing[2]};
      align-items: center;
      ${theme.textSize.base}
    `}>
      {username}
      <IoPersonCircleSharp size={24} />
    </div>
  );
};

UserNameIcon.propTypes = {
  username: PropTypes.string.isRequired
};

export default memo(UserNameIcon);
