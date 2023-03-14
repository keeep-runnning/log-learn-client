import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../../utils/apiClient";
import queryKeys from "../../utils/queryKeys";
import { LoggedInMe, MyProfile } from "./../../types/auth";

type LoginCredential = {
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
  status: "loggedIn";
  myProfile: MyProfile;
};

type InvalidCredential = {
  status: "invalidCredential";
  message: string;
};

async function login({
  email,
  password,
}: LoginCredential): Promise<LoggedIn | InvalidCredential> {
  try {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return {
      status: "loggedIn",
      myProfile: data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 401: {
          return {
            status: "invalidCredential",
            message: error.message,
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
      if (loginResult.status === "loggedIn") {
        queryClient.setQueryData<LoggedInMe>(queryKeys.me, {
          status: "loggedIn",
          myProfile: loginResult.myProfile,
        });
      }
    },
  });
}
