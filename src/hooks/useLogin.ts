import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import httpClient, { ErrorResponseBody } from "../utils/httpClient";
import pageUrl from "../utils/pageUrl";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  userId: number;
  username: string;
};

type LoggedIn = {
  result: "loggedIn";
} & LoginResponse;

type InvalidCredential = {
  result: "invalidCredential";
  reason: string;
};

type LoginResult = LoggedIn | InvalidCredential;

async function login(credential: LoginRequest): Promise<LoginResult> {
  try {
    const { data } = await httpClient.post<LoginResponse>("/auth/login", credential);
    return {
      result: "loggedIn",
      ...data,
    };
  } catch (error) {
    if (isAxiosError<ErrorResponseBody>(error) && error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        return {
          result: "invalidCredential",
          reason: data.errorMessage,
        };
      }
    }
    throw error;
  }
}

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (loginResult) => {
      if (loginResult.result === "loggedIn") {
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
        navigate(pageUrl.getUserHomePageUrl(loginResult.username), { replace: true });
      }
    },
  });
}
