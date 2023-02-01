import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import httpClient, { ErrorResponseBody } from "../utils/httpClient";
import pageUrl from "../utils/pageUrl";

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

type SucceededSignUpResult = {
  result: "succeeded";
} & SignUpResponseBody;

type FailedSignUpResult = {
  result: "failed";
  reason: string;
};

type SignUpResult = SucceededSignUpResult | FailedSignUpResult;

async function signUp(newUser: SignUpRequestBody): Promise<SignUpResult> {
  try {
    const { data } = await httpClient.post<SignUpResponseBody>("/auth/signup", newUser);
    return {
      result: "succeeded",
      ...data,
    };
  } catch (error) {
    if (isAxiosError<ErrorResponseBody>(error) && error.response) {
      if (error.response.status === 409) {
        return {
          result: "failed",
          reason: error.response.data.errorMessage,
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
      if (signUpResult.result === "succeeded") {
        navigate(pageUrl.getLoginPageUrl(), { replace: true });
        toast({
          title: "회원가입 성공",
          description: `${signUpResult.username}님 환영합니다. 로그인 해주세요.`,
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    },
  });
}
