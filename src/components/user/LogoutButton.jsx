import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";

import { logout } from "../../apis";
import useNotifications from "../../hooks/useNotifications";
import { NOTIFICATION_TYPE } from "../../constants/notifications";

const LogoutButton = ({ children }) => {
  const queryClient = useQueryClient();

  const { addNotification } = useNotifications();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentUser");
      addNotification({
        type: NOTIFICATION_TYPE.SUCCESS,
        content: "로그아웃 되었습니다.",
        isAutoClose: true
      });
    }
  });

  const handleLogoutButtonClick = useCallback(() => {
    logoutMutation.mutate();
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
