import { Link } from "react-router-dom";
import { Button, ButtonGroup, Container, Flex } from "@chakra-ui/react";

import Logo from "./Logo";
import pageUrl from "../../utils/pageUrl";
import UserMenu from "./UserMenu";

const dummyLoggedInUser = null;

export default function HeaderBar() {
  return (
    <Container maxW="container.xl">
      <Flex as="header" h={20} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Logo />
        </Link>
        {dummyLoggedInUser ? (
          <UserMenu username={dummyLoggedInUser} />
        ) : (
          <ButtonGroup colorScheme="main" size="sm">
            <Button as={Link} to={pageUrl.getLoginPageUrl()} variant="ghost">
              로그인
            </Button>
            <Button as={Link} to={pageUrl.getSignUpPageUrl()}>
              회원가입
            </Button>
          </ButtonGroup>
        )}
      </Flex>
    </Container>
  );
}
