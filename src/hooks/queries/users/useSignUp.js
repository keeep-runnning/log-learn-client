import { useMutation } from "react-query";

import apiClient from "../apiClient";

const signUp = async ({ username, email, password }) => {
  const response = await apiClient.post("/api/users", { username, email, password });
  return response.data;
};

const useSignUp = () => {
  return useMutation(signUp);
};

export default useSignUp;
