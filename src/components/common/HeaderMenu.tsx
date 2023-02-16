import { Button, ButtonGroup, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import useMeQuery from "../../hooks/useMeQuery";
import pageUrl from "../../utils/pageUrl";
import MyMenu from "./MyMenu";

export default function HeaderMenu() {
  const me = useMeQuery();

  if (me.data) {
    if (!me.data.isLoggedIn) {
      return (
        <ButtonGroup colorScheme="main" size="sm">
          <Button as={Link} to={pageUrl.getLoginPageUrl()} variant="ghost">
            로그인
          </Button>
          <Button as={Link} to={pageUrl.getSignUpPageUrl()}>
            회원가입
          </Button>
        </ButtonGroup>
      );
    }

    return <MyMenu username={me.data.username} />;
  }

  return (
    <Skeleton>
      <Button>loading</Button>
    </Skeleton>
  );
}
