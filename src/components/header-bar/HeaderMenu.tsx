import { Button, ButtonGroup, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import useMeQuery from "../../hooks/auth/useMeQuery";
import { pagePath } from "../../utils/page";
import MyMenu from "./MyMenu";

export default function HeaderMenu() {
  const meQuery = useMeQuery();

  if (meQuery.data) {
    if (meQuery.data.status === "loggedOut") {
      return (
        <ButtonGroup colorScheme="main" size="sm">
          <Button as={Link} to={pagePath.getLogin()} variant="ghost">
            로그인
          </Button>
          <Button as={Link} to={pagePath.getSignUp()}>
            회원가입
          </Button>
        </ButtonGroup>
      );
    }

    return <MyMenu username={meQuery.data.myProfile.username} />;
  }

  return (
    <Skeleton>
      <Button>loading</Button>
    </Skeleton>
  );
}
