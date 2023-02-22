import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, { ApiFieldError, ApiResponseError } from "../../utils/apiClient";

type SetUsernameResponse = {
  username: string;
};

type Submitted = {
  result: "submitted";
} & SetUsernameResponse;

type Unauthenticated = {
  result: "unauthenticated";
  reason: string;
};

type UsernameExists = {
  result: "usernameExists";
  reason: string;
};

type FieldInvalid = {
  result: "fieldInvalid";
  fieldErrors: ApiFieldError[];
};

type SetUsernameResult = Submitted | Unauthenticated | UsernameExists | FieldInvalid;

async function setUsername(username: string): Promise<SetUsernameResult> {
  try {
    const { data } = await apiClient.put<SetUsernameResponse>("/auth/me/username", {
      username,
    });
    return {
      result: "submitted",
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            result: "fieldInvalid",
            fieldErrors: error.fieldErrors,
          };
        }
        case 401: {
          return {
            result: "unauthenticated",
            reason: error.message,
          };
        }
        case 409: {
          return {
            result: "usernameExists",
            reason: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function useUsernameSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setUsername,
    onSuccess: (usernameSettingResult) => {
      if (usernameSettingResult.result === "submitted") {
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
    },
  });
}
