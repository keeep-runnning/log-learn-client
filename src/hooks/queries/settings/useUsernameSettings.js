import { useMutation, useQueryClient } from "react-query";

import apiClient from "../apiClient";
import { currentUserKey, settingsKey } from "../queryKeys";

const editUsername = async (username) => {
  const response = await apiClient.patch("/api/settings/username", { username });
  return response.data;
};

const useUsernameSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(editUsername, {
    onSuccess: () => {
      queryClient.invalidateQueries(settingsKey);
      queryClient.invalidateQueries(currentUserKey);
    }
  });
};

export default useUsernameSettings;
