import { useQuery } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../../utils/apiClient";
import queryKeys from "../../utils/queryKeys";

type LoadUserInfoResponse = {
  username: string;
  shortIntroduction: string;
  introduction: string;
};

type Loaded = {
  result: "loaded";
} & LoadUserInfoResponse;

type NotFound = {
  result: "notFound";
};

type LoadUserInfoResult = Loaded | NotFound;

async function loadUserInfo(username: string): Promise<LoadUserInfoResult> {
  try {
    const { data } = await apiClient.get<LoadUserInfoResponse>(`/users/${username}`);
    return {
      result: "loaded",
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 404: {
          return {
            result: "notFound",
          };
        }
      }
    }

    throw error;
  }
}

export default function useUserInfoQuery(username: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(username),
    queryFn: () => loadUserInfo(username),
  });
}
