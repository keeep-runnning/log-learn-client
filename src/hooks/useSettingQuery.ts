import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import httpClient, { ErrorResponseBody } from "../utils/httpClient";

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
    const { data } = await httpClient.get<SettingResponse>("/auth/settings");
    return {
      result: "loaded",
      ...data,
    };
  } catch (error) {
    if (isAxiosError<ErrorResponseBody>(error) && error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        return {
          result: "denied",
          reason: data.errorMessage,
        };
      }
    }
    throw error;
  }
}

export default function useSettingQuery() {
  return useQuery({
    queryKey: ["setting"],
    queryFn: loadSetting,
    cacheTime: 0,
  });
}
