import { useCallback } from "react";
import PropTypes from "prop-types";

import useNotifications from "../../hooks/useNotifications";
import { NOTIFICATION_TYPE } from "../../constants/notifications";
import useLogout from "../../hooks/queries/auth/useLogout";

const LogoutButton = ({ children }) => {
  const { addNotification } = useNotifications();

  const logoutMutation = useLogout();

  const handleLogoutButtonClick = useCallback(() => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        addNotification({
          type: NOTIFICATION_TYPE.SUCCESS,
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
