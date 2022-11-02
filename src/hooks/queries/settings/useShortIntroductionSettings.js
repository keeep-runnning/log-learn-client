import { useMutation, useQueryClient } from "react-query";

import apiClient from "../apiClient";
import { settingsKey } from "../queryKeys";

const editShortIntroduction = async (shortIntroduction) => {
  const response = await apiClient.patch("/api/settings/short-introduction", { shortIntroduction });
  return response.data;
};

const useShortIntroductionSettings = () => {
  const queryClient = useQueryClient();

  return useMutation(editShortIntroduction, {
    onSuccess: () => {
      queryClient.invalidateQueries(settingsKey);
    },
  });
};

export default useShortIntroductionSettings;
