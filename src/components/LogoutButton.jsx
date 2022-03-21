import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

async function logout() {
  const response = await axios.post("/api/logout");
  return response.data;
}

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
