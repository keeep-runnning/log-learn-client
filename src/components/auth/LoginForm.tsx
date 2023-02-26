import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import useLogin from "../../hooks/auth/useLogin";
import { pagePath } from "../../utils/page";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const handleSubmitLoginForm = handleSubmit(({ email, password }) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (result) => {
          switch (result.status) {
            case "loggedIn": {
              const redirectURL =
                location.state?.from?.pathname || pagePath.getBlog(result.myProfile.username);
              navigate(redirectURL, { replace: true });
              break;
            }
            case "invalidCredential": {
              setAlertMessage(result.message);
              break;
            }
            default: {
              throw new Error("unexpected result of login");
            }
          }
        },
      }
    );
  });

  return (
    <Flex as="form" onSubmit={handleSubmitLoginForm} direction="column" rowGap={4}>
      {alertMessage ? (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      ) : null}
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">이메일</FormLabel>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요",
          })}
        />
        {errors.email ? <FormErrorMessage>{errors.email.message}</FormErrorMessage> : null}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor="password">비밀번호</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
        />
        {errors.password ? <FormErrorMessage>{errors.password.message}</FormErrorMessage> : null}
      </FormControl>
      <Button
        type="submit"
        colorScheme="main"
        loadingText="로그인 중..."
        isLoading={loginMutation.isLoading}
      >
        로그인
      </Button>
    </Flex>
  );
}
