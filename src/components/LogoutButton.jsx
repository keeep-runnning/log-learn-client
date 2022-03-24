import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";

import { logout } from "../apis/users";

const LogoutButton = ({ children }) => {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentUser");
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
