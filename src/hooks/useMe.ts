import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import httpClient, { ErrorResponseBody } from "../utils/httpClient";

type GetMeResponseBody = {
  userId: number;
  username: string;
};

type Me =
  | ({
      isLoggedIn: true;
    } & GetMeResponseBody)
  | {
      isLoggedIn: false;
    };

async function getMe(): Promise<Me> {
  try {
    const { data } = await httpClient.get<GetMeResponseBody>("/auth/me");
    return {
      isLoggedIn: true,
      ...data,
    };
  } catch (error) {
    if (isAxiosError<ErrorResponseBody>(error) && error.response) {
      if (error.response.status === 401) {
        return {
          isLoggedIn: false,
        };
      }
    }
    throw error;
  }
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
}
