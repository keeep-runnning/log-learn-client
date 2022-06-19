import { useQuery } from "react-query";

import apiClient from "../apiClient";
import { userKeys } from "../queryKeys";

const fetchUser = async (username) => {
  const response = await apiClient.get(`/api/users/${encodeURIComponent(username)}`);
  return response.data;
};

const useUserQuery = (username) => {
  return useQuery(
    userKeys.detail(username),
    () => fetchUser(username),
    {
      retry: (failureCount, error) => {
        if(error.response) {
          return error.response.status !== 404 && failureCount <= 3;
        }
        return failureCount <= 3;
      }
    });
};

export default useUserQuery;
