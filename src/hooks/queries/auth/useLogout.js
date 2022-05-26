import { useMutation, useQueryClient } from "react-query";

import apiClient from "../apiClient";
import { currentUserKey } from "./queryKeys";

const logout = async () => {
  const response = await apiClient.post("/api/auth/logout");
  return response.data;
};

const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(currentUserKey);
    }
  });
};

export default useLogout;
