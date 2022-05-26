import { useMutation, useQueryClient } from "react-query";

import apiClient from "../apiClient";
import { currentUserKey } from "./queryKeys";

const login = async ({ email, password }) => {
  const response = await apiClient.post("/api/auth/login", { email, password });
  return response.data;
};

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(currentUserKey);
    }
  });
};

export default useLogin;
