import { Link } from "react-router-dom";
import { css } from "@emotion/react";

import UserProfilePopover from "./UserProfilePopover";
import Logo from "./Logo";
import PrimaryButton from "./buttons/PrimaryButton";
import useCurrentUser from "../../hooks/useCurrentUser";

const HeaderBar = () => {
  const currentUser = useCurrentUser();

  return (
    <header css={theme => css`
      height: 80px;
      padding: ${theme.spacing[4]};
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}>
      <Link to="/">
        <Logo />
      </Link>
      {currentUser.isLoggedIn ?
        <UserProfilePopover username={currentUser.username} /> :
        <PrimaryButton as={Link} to="/login">로그인</PrimaryButton>
      }
    </header>
  );
};

export default HeaderBar;
