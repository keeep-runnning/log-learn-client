import { useQuery } from "react-query";

import apiClient from "../apiClient";
import { settingsKey } from "./queryKeys";

const fetchSettings = async () => {
  const response = await apiClient.get("/api/settings");
  return response.data;
};

const useSettingsQuery = () => {
  return useQuery(settingsKey, fetchSettings);
};

export default useSettingsQuery;
