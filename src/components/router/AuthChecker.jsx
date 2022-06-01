import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthChecker = ({ children, isLoggedIn }) => {
  if(!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

AuthChecker.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default AuthChecker;
