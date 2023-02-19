import { Navigate, useLocation } from "react-router-dom";

import useMeQuery from "../hooks/useMeQuery";
import { pagePath } from "../utils/page";
import LoadingMessage from "../components/common/LoadingMessage";
import BaseContainer from "./BaseContainer";

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
    <BaseContainer>
      <LoadingMessage />
    </BaseContainer>
  );
}
