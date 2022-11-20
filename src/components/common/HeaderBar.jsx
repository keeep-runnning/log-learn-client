import { Link } from "react-router-dom";
import Logo from "./Logo";
import useCurrentUserQuery from "../../hooks/queries/auth/useCurrentUserQuery";
import pageUrl from "../../utils/pageUrl";
import { Button, ButtonGroup, Container, Flex } from "@chakra-ui/react";
import UserMenu from "./UserMenu";

export default function HeaderBar() {
  const currentUser = useCurrentUserQuery();

  return (
    <Container maxW="container.xl">
      <Flex as="header" h={20} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Logo />
        </Link>
        {currentUser.isLoggedIn ? (
          <UserMenu username={currentUser.username} />
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
