import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import apiClient, { ApiFieldError, ApiResponseError } from "../utils/apiClient";
import pageUrl from "../utils/pageUrl";

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
