import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { memo } from "react";

const LinkMenuTabs = ({ menuList }) => {
  return (
    <ul css={theme => css`
      display: flex;
      flex-direction: column;
      row-gap: ${theme.spacing[2]};
      ${theme.mq.sm} {
        flex-direction: row;
        justify-content: center;
        column-gap: ${theme.spacing[4]};
      }
    `}>
      {menuList.map(({ name, link }) => (
        <li key={link}>
          <NavLink
            to={link}
            css={theme => css`
              display: block;
              padding: ${theme.spacing[2]} ${theme.spacing[4]};
              color: ${theme.textColor[4]};
              ${theme.textSize.sm}
              ${theme.borderRound.normal}
              &:hover {
                background-color: ${theme.primaryColor[1]};
              }
              &.active {
                color: ${theme.textColor[1]};
                background-color: ${theme.primaryColor[3]};
              }
              ${theme.mq.sm} {
                ${theme.borderRound.full}
              }
            `}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

LinkMenuTabs.propTypes = {
  menuList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  })).isRequired
};

export default memo(LinkMenuTabs);
