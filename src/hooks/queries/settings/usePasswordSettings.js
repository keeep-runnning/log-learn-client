import { useMutation } from "react-query";

import apiClient from "../apiClient";

const editPassword = async ({ password, newPassword }) => {
  const response = await apiClient.patch("/api/settings/password", { password, newPassword });
  return response.data;
};

const usePasswordSettings = () => {
  return useMutation(editPassword);
};

export default usePasswordSettings;
