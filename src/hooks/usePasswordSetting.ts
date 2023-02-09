import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, { ApiFieldError, ApiResponseError } from "../utils/apiClient";

type SetPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

type Submitted = {
  result: "submitted";
};

type FieldsInvalid = {
  result: "fieldsInvalid";
  fieldErrors: ApiFieldError[];
};

type Unauthenticated = {
  result: "unauthenticated";
  reason: string;
};

type OldPasswordWrong = {
  result: "oldPasswordWrong";
  reason: string;
};

type SetPasswordResult = Submitted | FieldsInvalid | Unauthenticated | OldPasswordWrong;

async function setPassword(passwords: SetPasswordRequest): Promise<SetPasswordResult> {
  try {
    await apiClient.put("/auth/settings/password", passwords);
    return {
      result: "submitted",
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            result: "fieldsInvalid",
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
            result: "oldPasswordWrong",
            reason: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function usePasswordSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPassword,
    onSuccess: (passwordSettingResult) => {
      if (passwordSettingResult.result === "unauthenticated") {
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
    },
  });
}
