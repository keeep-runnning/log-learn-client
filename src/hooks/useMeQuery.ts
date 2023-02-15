import { useQuery } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../utils/apiClient";

type LoadMeResponse = {
  id: number;
  username: string;
  email: string;
  shortIntroduction: string;
  introduction: string;
};

export type LoggedInMe = {
  isLoggedIn: true;
} & LoadMeResponse;

export type LoggedOutMe = {
  isLoggedIn: false;
};

type LoadMeResult = LoggedInMe | LoggedOutMe;

async function loadMe(): Promise<LoadMeResult> {
  try {
    const { data } = await apiClient.get<LoadMeResponse>("/auth/me");
    return {
      isLoggedIn: true,
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 401: {
          return {
            isLoggedIn: false,
          };
        }
      }
    }
    throw error;
  }
}

export default function useMeQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: loadMe,
  });
}
