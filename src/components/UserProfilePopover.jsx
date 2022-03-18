import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BsBoxArrowRight, BsGear, BsPencil } from "react-icons/bs";
import classNames from "classnames";

const UserProfilePopover = () => {
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
      <button onClick={togglePopover}>User Profile</button>
      <nav className={classNames(
        "transition delay-300 absolute right-1 min-w-max p-2 bg-gray-100 shadow-lg rounded",
        {
          ["translate-y-1/2 opacity-0 invisible"]: !isOpen,
          ["translate-y-1/4 opacity-100 visible"]: isOpen
        }
      )}>
        <ul className="text-gray-500 space-y-2">
          <li>
            <Link to="/settings">
              <div className="flex items-center gap-4 hover:font-bold hover:text-gray-900">
                <span>설정</span>
                <BsGear />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/write">
              <div className="flex items-center gap-4 hover:font-bold hover:text-gray-900">
                <span>글쓰기</span>
                <BsPencil />
              </div>
            </Link>
          </li>
          <li>
            <button className="flex items-center gap-4 hover:font-bold hover:text-gray-900">
              <span>로그아웃</span>
              <BsBoxArrowRight />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserProfilePopover;
