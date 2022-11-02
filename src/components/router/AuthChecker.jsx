import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import pageUrl from "../../utils/pageUrl";

const AuthChecker = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to={pageUrl.getLoginPageUrl()} replace />;
  }

  return children;
};

AuthChecker.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AuthChecker;
