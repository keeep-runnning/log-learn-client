import { useQuery } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../utils/apiClient";

type SettingResponse = {
  username: string;
  email: string;
  shortIntroduction: string;
  introduction: string;
};

type Loaded = {
  result: "loaded";
} & SettingResponse;

type Denied = {
  result: "denied";
  reason: string;
};

type LoadSettingResult = Loaded | Denied;

async function loadSetting(): Promise<LoadSettingResult> {
  try {
    const { data } = await apiClient.get<SettingResponse>("/auth/settings");
    return {
      result: "loaded",
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 401: {
          return {
            result: "denied",
            reason: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function useSettingQuery() {
  return useQuery({
    queryKey: ["setting"],
    queryFn: loadSetting,
    retry: false,
    cacheTime: 0,
  });
}
