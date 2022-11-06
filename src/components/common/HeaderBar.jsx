import { Link } from "react-router-dom";
import Logo from "./Logo";
import useCurrentUserQuery from "../../hooks/queries/auth/useCurrentUserQuery";
import pageUrl from "../../utils/pageUrl";
import { Button, Container, Flex } from "@chakra-ui/react";
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
          <Button size="sm" colorScheme="main" as={Link} to={pageUrl.getLoginPageUrl()}>
            로그인
          </Button>
        )}
      </Flex>
    </Container>
  );
}
