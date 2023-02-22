import { useMutation } from "@tanstack/react-query";

import apiClient, { ApiFieldError, ApiResponseError } from "../../utils/apiClient";

type SignUpRequest = {
  username: string;
  email: string;
  password: string;
};

type SignUpResponse = {
  id: number;
  username: string;
  email: string;
  shortIntroduction: string;
  introduction: string;
};

type Submitted = {
  result: "submitted";
} & SignUpResponse;

type Failed = {
  result: "failed";
  reason: string;
};

type InvalidFields = {
  result: "invalidFields";
  fieldErrors: ApiFieldError[];
};

type SignUpResult = Submitted | Failed | InvalidFields;

async function signUp(newUser: SignUpRequest): Promise<SignUpResult> {
  try {
    const { data } = await apiClient.post<SignUpResponse>("/auth/signup", newUser);
    return {
      result: "submitted",
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            result: "invalidFields",
            fieldErrors: error.fieldErrors,
          };
        }
        case 409: {
          return {
            result: "failed",
            reason: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
