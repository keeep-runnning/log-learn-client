import { useForm } from "react-hook-form";
import { useCallback } from "react";
import usePasswordSettings from "../../hooks/queries/settings/usePasswordSettings";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

export default function PasswordSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      newPasswordCheck: "",
    },
    mode: "onChange",
  });

  const passwordSettingsMutation = usePasswordSettings();

  const toast = useToast();

  const setNewPassword = useCallback(({ password, newPassword }) => {
    passwordSettingsMutation.mutate(
      { password, newPassword },
      {
        onSuccess: () => {
          toast({
            description: "비밀번호가 수정되었습니다",
            status: "success",
            position: "top",
            isClosable: true,
          });
          reset({
            password: "",
            newPassword: "",
            newPasswordCheck: "",
          });
        },
        onError: (error) => {
          if (error.response) {
            const { code } = error.response.data;
            if (code === "user-003") {
              setError("password", {
                type: "isValid",
                message: "기존 비밀번호가 올바르지 않습니다",
              });
            }
          }
        },
      }
    );
  }, []);

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(setNewPassword)}
      direction="column"
      rowGap={6}
      alignItems="flex-end"
    >
      <FormControl isInvalid={Boolean(errors.password)}>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width={{ md: "25%" }} htmlFor="password">
            기존 비밀번호
          </FormLabel>
          <Box flexGrow={{ md: 1 }}>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "기존 비밀번호를 입력해주세요",
              })}
            />
            {errors.password ? (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            ) : null}
          </Box>
        </Flex>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.newPassword)}>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width={{ md: "25%" }} htmlFor="newPassword">
            새 비밀번호
          </FormLabel>
          <Box flexGrow={{ md: 1 }}>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword", {
                required: "새 비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "새 비밀번호를 8자 이상 32자 이하로 입력해주세요",
                },
                maxLength: {
                  value: 32,
                  message: "새 비밀번호를 8자 이상 32자 이하로 입력해주세요",
                },
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
                  message: "영문 대소문자/숫자/특수문자를 각각 1자 이상 포함해주세요",
                },
                validate: {
                  isChanged: (newPassword) =>
                    getValues("password") !== newPassword ||
                    "새 비밀번호가 기존 비밀번호와 같습니다",
                },
              })}
            />
            {errors.newPassword ? (
              <FormErrorMessage>{errors.newPassword.message}</FormErrorMessage>
            ) : null}
          </Box>
        </Flex>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.newPasswordCheck)}>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width={{ md: "25%" }} htmlFor="newPasswordCheck">
            새 비밀번호 확인
          </FormLabel>
          <Box flexGrow={{ md: 1 }}>
            <Input
              id="newPasswordCheck"
              type="password"
              {...register("newPasswordCheck", {
                required: "새 비밀번호 확인을 입력해주세요",
                validate: {
                  equalsToPassword: (newPasswordCheck) =>
                    getValues("newPassword") === newPasswordCheck ||
                    "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다",
                },
              })}
            />
            {errors.newPasswordCheck ? (
              <FormErrorMessage>{errors.newPasswordCheck.message}</FormErrorMessage>
            ) : null}
          </Box>
        </Flex>
      </FormControl>
      <Button
        type="submit"
        size="sm"
        colorScheme="main"
        isDisabled={passwordSettingsMutation.isLoading}
        isLoading={passwordSettingsMutation.isLoading}
        loadingText="수정 중..."
      >
        수정하기
      </Button>
    </Flex>
  );
}
