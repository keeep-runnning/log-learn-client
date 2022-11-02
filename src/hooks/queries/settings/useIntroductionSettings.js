import { useMutation, useQueryClient } from "react-query";

import apiClient from "../apiClient";
import { settingsKey } from "../queryKeys";

const editIntroduction = async (introduction) => {
  const response = await apiClient.patch("/api/settings/introduction", { introduction });
  return response.data;
};

const useIntroductionSettings = () => {
  const queryClient = useQueryClient();

  return useMutation(editIntroduction, {
    onSuccess: () => {
      queryClient.invalidateQueries(settingsKey);
    },
  });
};

export default useIntroductionSettings;
