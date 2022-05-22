import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoLogOutOutline, IoPencil, IoSettingsOutline } from "react-icons/io5";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

import LogoutButton from "../user/LogoutButton";
import UserMenuItem from "./UserMenuItem";
import UserNameIcon from "./UserNameIcon";

const userMenuData = [
  { name: "설정", link: "/settings", icon: <IoSettingsOutline /> },
  { name: "글쓰기", link: "/write", icon: <IoPencil /> }
];

const UserMenuPopover = ({ username }) => {
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
      <button onClick={togglePopover}>
        <UserNameIcon username={username} />
      </button>
      <nav css={theme => css`
          position: absolute;
          min-width: max-content;
          right: ${theme.spacing[1]};
          padding: ${theme.spacing[2]};
          background-color: ${theme.bgColor[2]};
          box-shadow: 3px 3px 8px 3px rgba(195, 204, 216, 0.75);
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
          {userMenuData.map(({ name, link, icon }) => (
            <li key={name}>
              <Link to={link}>
                <UserMenuItem>
                  {name} {icon}
                </UserMenuItem>
              </Link>
            </li>
          ))}
          <li>
            <LogoutButton>
              <UserMenuItem>
                로그아웃 <IoLogOutOutline />
              </UserMenuItem>
            </LogoutButton>
          </li>
        </ul>
      </nav>
    </div>
  );
};

UserMenuPopover.propTypes = {
  username: PropTypes.string.isRequired
};

export default UserMenuPopover;
