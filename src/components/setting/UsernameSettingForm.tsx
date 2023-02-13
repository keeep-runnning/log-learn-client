import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useUsernameSetting from "../../hooks/useUsernameSetting";
import pageUrl from "../../utils/pageUrl";

type UsernameSettingFormProps = {
  defaultUsername: string;
};

type UsernameSettingFormData = {
  username: string;
};

export default function UsernameSettingForm({ defaultUsername }: UsernameSettingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<UsernameSettingFormData>({
    defaultValues: {
      username: defaultUsername,
    },
  });

  const usernameSettingMutation = useUsernameSetting();

  const navigate = useNavigate();

  const handleSubmitUsernameSettingForm = handleSubmit(({ username }) => {
    usernameSettingMutation.mutate(username, {
      onSuccess: (usernameSettingResult) => {
        if (usernameSettingResult.result === "submitted") {
          reset({
            username: usernameSettingResult.username,
          });
        } else if (usernameSettingResult.result === "fieldInvalid") {
          usernameSettingResult.fieldErrors.forEach(({ field, reason }) => {
            if (field === "username") {
              setError(field, {
                type: "serverValidation",
                message: reason,
              });
            }
          });
        } else if (usernameSettingResult.result === "unauthenticated") {
          navigate(pageUrl.getLoginPageUrl(), {
            replace: true,
          });
        } else if (usernameSettingResult.result === "usernameExists") {
          setError("username", {
            type: "usernameExists",
            message: usernameSettingResult.reason,
          });
        }
      },
    });
  });

  return (
    <Flex as="form" onSubmit={handleSubmitUsernameSettingForm} direction="column" rowGap={4}>
      <FormControl isInvalid={Boolean(errors.username)}>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel htmlFor="username" width={{ md: "25%" }}>
            유저이름
          </FormLabel>
          <Flex direction="column" rowGap={2} flexGrow={{ md: 1 }}>
            <Input
              id="username"
              type="text"
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
            {errors.username ? (
              <FormErrorMessage>{errors.username.message}</FormErrorMessage>
            ) : null}
          </Flex>
        </Flex>
      </FormControl>
      <Button
        type="submit"
        size="sm"
        colorScheme="main"
        variant="ghost"
        isLoading={usernameSettingMutation.isLoading}
        loadingText="수정 중..."
        alignSelf="flex-end"
      >
        수정하기
      </Button>
    </Flex>
  );
}
