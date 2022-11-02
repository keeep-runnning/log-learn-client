import { useQuery } from "react-query";

import apiClient from "../apiClient";
import { currentUserKey } from "../queryKeys";

const fetchCurrentUser = async () => {
  const response = await apiClient.get("/api/auth/current-user");
  return response.data;
};

const initialData = {
  username: "",
  isLoggedIn: false,
};

const useCurrentUserQuery = () => {
  const { data: currentUser, isError } = useQuery(currentUserKey, fetchCurrentUser, {
    initialData,
  });

  if (isError) {
    return initialData;
  }

  return currentUser;
};

export default useCurrentUserQuery;
