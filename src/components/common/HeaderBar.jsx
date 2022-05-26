import { Link } from "react-router-dom";
import { css } from "@emotion/react";

import UserMenuPopover from "./UserMenuPopover";
import Logo from "./Logo";
import PrimaryButton from "./buttons/PrimaryButton";
import useCurrentUserQuery from "../../hooks/queries/auth/useCurrentUserQuery";

const HeaderBar = () => {
  const currentUser = useCurrentUserQuery();

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
        <UserMenuPopover username={currentUser.username} /> :
        <PrimaryButton as={Link} to="/login">로그인</PrimaryButton>
      }
    </header>
  );
};

export default HeaderBar;
