import { useMutation } from "@tanstack/react-query";

import apiClient, {
  ApiFieldError,
  ApiResponseError,
} from "../../lib/apiClient";

type SetPasswordData = {
  oldPassword: string;
  newPassword: string;
};

type Submitted = {
  status: "submitted";
};

type FieldsInvalid = {
  status: "fieldsInvalid";
  fieldErrors: ApiFieldError[];
};

type Unauthenticated = {
  status: "unauthenticated";
  message: string;
};

type OldPasswordWrong = {
  status: "oldPasswordWrong";
  message: string;
};

async function setPassword(
  passwords: SetPasswordData
): Promise<Submitted | FieldsInvalid | Unauthenticated | OldPasswordWrong> {
  try {
    await apiClient.put("/auth/me/password", passwords);
    return {
      status: "submitted",
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            status: "fieldsInvalid",
            fieldErrors: error.fieldErrors,
          };
        }
        case 401: {
          return {
            status: "unauthenticated",
            message: error.message,
          };
        }
        case 409: {
          return {
            status: "oldPasswordWrong",
            message: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function usePasswordSetting() {
  return useMutation({ mutationFn: setPassword });
}
