import { useQuery } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../utils/apiClient";

type LoadMeResponse = {
  userId: number;
  username: string;
};

type LoggedIn = {
  isLoggedIn: true;
} & LoadMeResponse;

type LoggedOut = {
  isLoggedIn: false;
};

type Me = LoggedIn | LoggedOut;

async function loadMe(): Promise<Me> {
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
    retry: false,
  });
}
