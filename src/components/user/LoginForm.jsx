import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/queries/auth/useLogin";
import pageUrl from "../../utils/pageUrl";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const toast = useToast();

  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onValid = useCallback(({ email, password }) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: ({ isLoggedIn, username }) => {
          if (!isLoggedIn) return;
          toast({
            description: "로그인 되었습니다",
            status: "success",
            isClosable: true,
            position: "top",
          });
          navigate(pageUrl.getUserHomePageUrl(username), { replace: true });
        },
        onError: (error) => {
          if (error.response) {
            const { code } = error.response.data;
            if (code === "auth-001") {
              setAlertMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
            }
          }
        },
      }
    );
  }, []);

  return (
    <Flex as="form" noValidate onSubmit={handleSubmit(onValid)} direction="column" rowGap={4}>
      {alertMessage ? (
        <Alert rounded="md" status="warning">
          <AlertIcon />
          {alertMessage}
        </Alert>
      ) : null}
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">이메일</FormLabel>
        <Input
          id="email"
          type="email"
          {...register("email", { required: "이메일을 입력해주세요" })}
        />
        {errors.email ? <FormErrorMessage>{errors.email.message}</FormErrorMessage> : null}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor="password">비밀번호</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", { required: "비밀번호를 입력해주세요" })}
        />
        {errors.password ? <FormErrorMessage>{errors.password.message}</FormErrorMessage> : null}
      </FormControl>
      <Button
        type="submit"
        colorScheme="main"
        isDisabled={loginMutation.isLoading}
        isLoading={loginMutation.isLoading}
        loadingText="로그인 중..."
      >
        로그인
      </Button>
    </Flex>
  );
}
