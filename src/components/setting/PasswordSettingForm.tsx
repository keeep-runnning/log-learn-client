import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import useHandleUnauthenticatedError from "../../hooks/useHandleUnauthenticatedError";
import usePasswordSetting from "../../hooks/usePasswordSetting";

type PasswordSettingFormData = {
  oldPassword: string;
  newPassword: string;
  newPasswordCheck: string;
};

export default function PasswordSettingForm() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    getValues,
  } = useForm<PasswordSettingFormData>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordCheck: "",
    },
  });

  const passwordSettingMutation = usePasswordSetting();

  const handleUnauthenticatedError = useHandleUnauthenticatedError();

  const handleSubmitPasswordSettingForm = handleSubmit(({ oldPassword, newPassword }) => {
    passwordSettingMutation.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: (passwordSettingResult) => {
          if (passwordSettingResult.result === "submitted") {
            reset();
            toast({
              description: "비밀번호가 변경되었습니다",
              status: "success",
              position: "top",
              isClosable: true,
            });
          } else if (passwordSettingResult.result === "fieldsInvalid") {
            passwordSettingResult.fieldErrors.forEach(({ field, reason }) => {
              if (field === "oldPassword" || field === "newPassword") {
                setError(field, {
                  type: "serverValidation",
                  message: reason,
                });
              }
            });
          } else if (passwordSettingResult.result === "oldPasswordWrong") {
            setError("oldPassword", {
              type: "oldPasswordWrong",
              message: passwordSettingResult.reason,
            });
          } else if (passwordSettingResult.result === "unauthenticated") {
            handleUnauthenticatedError();
          }
        },
      }
    );
  });

  return (
    <Flex
      as="form"
      onSubmit={handleSubmitPasswordSettingForm}
      direction="column"
      rowGap={6}
      alignItems="flex-end"
    >
      <FormControl
        isInvalid={Boolean(errors.oldPassword)}
        as={Flex}
        direction={{ base: "column", md: "row" }}
      >
        <FormLabel width={{ md: "25%" }} htmlFor="old-password">
          기존 비밀번호
        </FormLabel>
        <Flex direction="column" rowGap={2} flexGrow={{ md: 1 }}>
          <Input
            id="old-password"
            type="password"
            {...register("oldPassword", {
              required: "기존 비밀번호를 입력해주세요",
            })}
          />
          {errors.oldPassword ? (
            <FormErrorMessage>{errors.oldPassword.message}</FormErrorMessage>
          ) : null}
        </Flex>
      </FormControl>
      <FormControl
        isInvalid={Boolean(errors.newPassword)}
        as={Flex}
        direction={{ base: "column", md: "row" }}
      >
        <FormLabel width={{ md: "25%" }} htmlFor="new-password">
          새 비밀번호
        </FormLabel>
        <Flex direction="column" rowGap={2} flexGrow={{ md: 1 }}>
          <Input
            id="new-password"
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
            })}
          />
          {errors.newPassword ? (
            <FormErrorMessage>{errors.newPassword.message}</FormErrorMessage>
          ) : null}
        </Flex>
      </FormControl>
      <FormControl
        isInvalid={Boolean(errors.newPasswordCheck)}
        as={Flex}
        direction={{ base: "column", md: "row" }}
      >
        <FormLabel width={{ md: "25%" }} htmlFor="new-password-check">
          새 비밀번호 확인
        </FormLabel>
        <Flex direction="column" rowGap={2} flexGrow={{ md: 1 }}>
          <Input
            id="new-password-check"
            type="password"
            {...register("newPasswordCheck", {
              required: "새 비밀번호 확인을 입력해주세요",
              validate: {
                matchNewPassword: (newPasswordCheck) =>
                  newPasswordCheck === getValues("newPassword") ||
                  "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다",
              },
            })}
          />
          {errors.newPasswordCheck ? (
            <FormErrorMessage>{errors.newPasswordCheck.message}</FormErrorMessage>
          ) : null}
        </Flex>
      </FormControl>
      <Button
        type="submit"
        size="sm"
        colorScheme="main"
        variant="ghost"
        isLoading={passwordSettingMutation.isLoading}
        loadingText="수정 중..."
      >
        수정하기
      </Button>
    </Flex>
  );
}
