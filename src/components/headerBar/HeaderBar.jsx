import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { css } from "@emotion/react";

import { fetchCurrentUser } from "../../apis/users";
import UserProfilePopover from "../UserProfilePopover";
import Logo from "./Logo";
import PrimaryButton from "../buttons/PrimaryButton";

const HeaderBar = () => {
  const { data: currentUser, isLoading, isError } = useQuery("currentUser", fetchCurrentUser);

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
      {(isLoading || isError || !currentUser.isLoggedIn) ? (
        <PrimaryButton as={Link} to="/login">로그인</PrimaryButton>
        ): (<UserProfilePopover username={currentUser.username} />)
      }
    </header>
  );
};

export default HeaderBar;
