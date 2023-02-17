import { Container } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";

import useMeQuery from "../hooks/useMeQuery";
import { pagePath } from "../utils/page";
import LoadingMessage from "../components/common/LoadingMessage";

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
      <LoadingMessage />
    </Container>
  );
}
