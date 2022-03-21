import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BsBoxArrowRight, BsGear, BsPencil } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import classNames from "classnames";
import PropTypes from "prop-types";

import LogoutButton from "./LogoutButton";
import UserProfileMenuItem from "./UserProfileMenuItem";

const UserProfilePopover = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timerId = useRef();

  const togglePopover = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const onPopoverBlurred = useCallback(() => {
    timerId.current = setTimeout(() => {
      setIsOpen(false);
    });
  }, []);

  const onPopoverFocused = useCallback(() => {
    clearTimeout(timerId.current);
  }, []);

  return (
    <div onBlur={onPopoverBlurred} onFocus={onPopoverFocused} className="relative">
      <button className="hover:font-bold hover:scale-105 flex items-center gap-x-2" onClick={togglePopover}>
        <span className="text-gray-800">{username}</span>
        <HiUserCircle className="w-8 h-8" />
      </button>
      <nav className={classNames(
        "transition delay-300 absolute right-1 min-w-max p-2 bg-gray-100 shadow-lg rounded",
        {
          "translate-y-1/2 opacity-0 invisible": !isOpen,
          "translate-y-1/4 opacity-100 visible": isOpen
        }
      )}>
        <ul className="space-y-2">
          <li>
            <Link to="/settings">
              <UserProfileMenuItem menuName="설정" icon={<BsGear />} />
            </Link>
          </li>
          <li>
            <Link to="/write">
              <UserProfileMenuItem menuName="글쓰기" icon={<BsPencil />} />
            </Link>
          </li>
          <li>
            <LogoutButton>
              <UserProfileMenuItem menuName="로그아웃" icon={<BsBoxArrowRight />} />
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
