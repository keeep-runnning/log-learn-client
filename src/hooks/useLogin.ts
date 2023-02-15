import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../utils/apiClient";
import { LoggedInMe } from "./useMeQuery";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  id: number;
  username: string;
  email: string;
  shortIntroduction: string;
  introduction: string;
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
    const { data } = await apiClient.post<LoginResponse>("/auth/login", credential);
    return {
      result: "loggedIn",
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 401: {
          return {
            result: "invalidCredential",
            reason: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (loginResult) => {
      if (loginResult.result === "loggedIn") {
        const { id, username, email, shortIntroduction, introduction } = loginResult;
        const loggedInMe: LoggedInMe = {
          isLoggedIn: true,
          id,
          username,
          email,
          shortIntroduction,
          introduction,
        };
        queryClient.setQueryData(["me"], loggedInMe);
      }
    },
  });
}
