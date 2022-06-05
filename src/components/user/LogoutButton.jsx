import { useCallback } from "react";
import PropTypes from "prop-types";

import useNotifications from "../../hooks/useNotifications";
import useLogout from "../../hooks/queries/auth/useLogout";

const LogoutButton = ({ children }) => {
  const { notifySuccess } = useNotifications();

  const logoutMutation = useLogout();

  const handleLogoutButtonClick = useCallback(() => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        notifySuccess({ content: "로그아웃 되었습니다." });
      }
    });
  }, []);

  return (
    <button disabled={logoutMutation.isLoading} onClick={handleLogoutButtonClick}>
      {children}
    </button>
  )
};

LogoutButton.propTypes = {
  children: PropTypes.node.isRequired
};

export default LogoutButton;
