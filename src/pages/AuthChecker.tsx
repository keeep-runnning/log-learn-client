import { Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";

import useMeQuery from "../hooks/useMeQuery";
import { pagePath } from "../utils/page";

type AuthCheckerProps = {
  children: JSX.Element;
};

export default function AuthChecker({ children }: AuthCheckerProps) {
  const me = useMeQuery();

  const location = useLocation();

  if (me.data) {
    if (!me.data.isLoggedIn) {
      return <Navigate to={pagePath.getLogin()} replace state={{ from: location }} />;
    }

    return children;
  }

  return (
    <Container maxW="container.lg">
      <Flex px={4} py={8} direction="column" rowGap={6} alignItems="center">
        <Spinner color="main.500" />
        <Text fontSize="2xl">잠시 기다려주세요</Text>
      </Flex>
    </Container>
  );
}
