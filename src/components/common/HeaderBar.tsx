import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup, Container, Flex } from "@chakra-ui/react";

import Logo from "./Logo";
import pageUrl from "../../utils/pageUrl";
import UserMenu from "./UserMenu";
import { useMe } from "../../hooks/useMe";

export default function HeaderBar() {
  const me = useMe();

  if (me.isLoading) {
    return <Box>loading...</Box>;
  }

  return (
    <Container maxW="container.xl">
      <Flex as="header" h={20} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Logo />
        </Link>
        {me.data?.isLoggedIn ? (
          <UserMenu username={me.data.username} />
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
