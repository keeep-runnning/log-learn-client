import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useSignUp from "../../hooks/queries/users/useSignUp";
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

export default function SignUpForm() {
  const toast = useToast();

  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");

  const signUpMutation = useSignUp();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onValid = useCallback(({ username, email, password }) => {
    signUpMutation.mutate(
      { username, email, password },
      {
        onSuccess: () => {
          toast({
            description: "계정이 생성되었습니다. 로그인 해주세요.",
            status: "success",
            isClosable: true,
            position: "top",
          });
          navigate(pageUrl.getLoginPageUrl(), { replace: true });
        },
        onError: (error) => {
          if (error.response) {
            const { code } = error.response.data;
            if (code === "user-001") {
              setAlertMessage("이미 사용중인 유저이름입니다.");
            } else if (code === "user-002") {
              setAlertMessage("이미 사용중인 이메일입니다.");
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
      <FormControl isInvalid={Boolean(errors.username)}>
        <FormLabel htmlFor="username">유저이름</FormLabel>
        <Input
          id="username"
          type="text"
          placeholder="유저이름"
          {...register("username", {
            required: "유저이름을 입력해주세요",
            minLength: {
              value: 2,
              message: "유저이름을 2자 이상 20자 이하로 입력해주세요",
            },
            maxLength: {
              value: 20,
              message: "유저이름을 2자 이상 20자 이하로 입력해주세요",
            },
            pattern: {
              value: /^[ㄱ-ㅎ가-힣\w-]+$/,
              message:
                "한글/영문 대소문자/숫자/언더바(_)/하이픈(-)만을 이용해 유저이름을 입력해주세요",
            },
          })}
        />
        {errors.username ? <FormErrorMessage>{errors.username.message}</FormErrorMessage> : null}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">이메일</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
              message: "이메일 형식이 올바르지 않습니다",
            },
          })}
        />
        {errors.email ? <FormErrorMessage>{errors.email.message}</FormErrorMessage> : null}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor="password">비밀번호</FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="********"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 8,
              message: "비밀번호를 8자 이상 32자 이하로 입력해주세요",
            },
            maxLength: {
              value: 32,
              message: "비밀번호를 8자 이상 32자 이하로 입력해주세요",
            },
            pattern: {
              value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
              message: "영문 대소문자/숫자/특수문자를 각각 1자 이상 포함해주세요",
            },
          })}
        />
        {errors.password ? <FormErrorMessage>{errors.password.message}</FormErrorMessage> : null}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.passwordCheck)}>
        <FormLabel htmlFor="passwordCheck">비밀번호 확인</FormLabel>
        <Input
          id="passwordCheck"
          type="password"
          placeholder="********"
          {...register("passwordCheck", {
            required: "비밀번호 확인을 입력해주세요",
            validate: {
              equalsToPassword: (passwordCheck) =>
                passwordCheck === getValues("password") ||
                "비밀번호와 비밀번호 확인이 일치하지 않습니다",
            },
          })}
        />
        {errors.passwordCheck ? (
          <FormErrorMessage>{errors.passwordCheck.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      <Button
        type="submit"
        colorScheme="main"
        isDisabled={signUpMutation.isLoading}
        isLoading={signUpMutation.isLoading}
        loadingText="회원가입 중..."
      >
        회원가입
      </Button>
    </Flex>
  );
}
