import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoLogOutOutline, IoPencil, IoPersonCircleSharp, IoSettingsOutline } from "react-icons/io5";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

import LogoutButton from "./LogoutButton";
import UserProfileMenuItem from "./UserProfileMenuItem";

const UserProfilePopover = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timerId = useRef();

  const togglePopover = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const handlePopoverBlur = useCallback(() => {
    timerId.current = setTimeout(() => {
      setIsOpen(false);
    });
  }, []);

  const handlePopoverFocus = useCallback(() => {
    clearTimeout(timerId.current);
  }, []);

  return (
    <div onBlur={handlePopoverBlur} onFocus={handlePopoverFocus} css={css`position: relative;`}>
      <button onClick={togglePopover}
        css={theme => css`
          display: flex;
          column-gap: ${theme.spacing[2]};
          align-items: center;
          ${theme.textSize.base}
        `}
      >
        {username}
        <IoPersonCircleSharp size={24} />
      </button>
      <nav css={theme => css`
          position: absolute;
          min-width: max-content;
          right: ${theme.spacing[1]};
          padding: ${theme.spacing[2]};
          background-color: ${theme.bgColor[2]};
          box-shadow: 3px 3px 8px 3px rgba(195,204,216,0.75);
          ${theme.borderRound.normal}
          transform: translateY(60%);
          opacity: 0;
          visibility: hidden;
          transition: transform 150ms ease-in, opacity 150ms ease-in, visibility 150ms ease-in;
          ${isOpen && css`
            transform: translateY(15%);
            opacity: 1;
            visibility: visible;
          `}
        `}
      >
        <ul css={theme => css`
          display: flex;
          flex-direction: column;
          row-gap: ${theme.spacing[3]};
        `}>
          <li>
            <Link to="/settings">
              <UserProfileMenuItem>
                설정 <IoSettingsOutline />
              </UserProfileMenuItem>
            </Link>
          </li>
          <li>
            <Link to="/write">
              <UserProfileMenuItem>
                글쓰기 <IoPencil />
              </UserProfileMenuItem>
            </Link>
          </li>
          <li>
            <LogoutButton>
              <UserProfileMenuItem>
                로그아웃 <IoLogOutOutline />
              </UserProfileMenuItem>
            </LogoutButton>
          </li>
        </ul>
      </nav>
    </div>
  );
};

UserProfilePopover.propTypes = {
  username: PropTypes.string.isRequired
};

export default UserProfilePopover;
