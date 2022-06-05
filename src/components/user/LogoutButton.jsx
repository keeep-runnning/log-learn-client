import { useCallback } from "react";
import PropTypes from "prop-types";

import useLogout from "../../hooks/queries/auth/useLogout";
import useNotificationsWithRedirect from "../../hooks/useNotificationsWithRedirect";

const LogoutButton = ({ children }) => {
  const { redirectThenNotifySuccess } = useNotificationsWithRedirect();
  const logoutMutation = useLogout();

  const handleLogoutButtonClick = useCallback(() => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        redirectThenNotifySuccess({
          to: "/",
          content: "로그아웃 되었습니다."
        });
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
