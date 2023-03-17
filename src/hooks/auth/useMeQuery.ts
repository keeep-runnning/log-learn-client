import { useQuery } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../../lib/apiClient";
import queryKeys from "../../utils/queryKeys";
import { LoggedInMe, LoggedOutMe } from "../../types/auth";

type LoadMeResponse = {
  id: number;
  username: string;
  email: string;
  shortIntroduction: string;
  introduction: string;
};

async function loadMe(): Promise<LoggedInMe | LoggedOutMe> {
  try {
    const { data } = await apiClient.get<LoadMeResponse>("/auth/me");
    return {
      status: "loggedIn",
      myProfile: data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 401: {
          return {
            status: "loggedOut",
          };
        }
      }
    }
    throw error;
  }
}

export default function useMeQuery() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: loadMe,
  });
}
