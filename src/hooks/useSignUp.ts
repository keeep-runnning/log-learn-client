import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import httpClient, { ErrorResponseBody } from "../utils/httpClient";
import pageUrl from "../utils/pageUrl";

type FieldError = {
  value?: unknown;
  message: string;
};

type SignUpRequestBody = {
  username: string;
  email: string;
  password: string;
};

type SignUpResponseBody = {
  userId: number;
  username: string;
  email: string;
};

type Submitted = {
  result: "submitted";
} & SignUpResponseBody;

type Failed = {
  result: "failed";
  reason: string;
};

type InvalidFields = {
  result: "invalidFields";
  validationResult: Record<string, FieldError>;
};

type SignUpResult = Submitted | Failed | InvalidFields;

async function signUp(newUser: SignUpRequestBody): Promise<SignUpResult> {
  try {
    const { data } = await httpClient.post<SignUpResponseBody>("/auth/signup", newUser);
    return {
      result: "submitted",
      ...data,
    };
  } catch (error) {
    if (isAxiosError<ErrorResponseBody>(error) && error.response) {
      const { status, data } = error.response;
      if (status === 409) {
        return {
          result: "failed",
          reason: data.errorMessage,
        };
      } else if (status === 400) {
        const fieldValidationResult = data.errors.reduce((result, { field, value, reason }) => {
          if (result[field]) return result;
          result[field] = { value, message: reason };
          return result;
        }, {} as Record<string, FieldError>);

        return {
          result: "invalidFields",
          validationResult: fieldValidationResult,
        };
      }
    }
    throw error;
  }
}

export default function useSignUp() {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (signUpResult) => {
      if (signUpResult.result === "submitted") {
        navigate(pageUrl.getLoginPageUrl(), { replace: true });
        toast({
          title: "회원가입 성공",
          description: `${signUpResult.username}님 환영합니다. 로그인 해주세요.`,
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });
}
