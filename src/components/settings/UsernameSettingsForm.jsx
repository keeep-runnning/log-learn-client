import { useCallback } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useUsernameSettings from "../../hooks/queries/settings/useUsernameSettings";
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

export default function UsernameSettingsForm({ data }) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: data,
    },
    mode: "onChange",
  });

  const usernameSettingsMutation = useUsernameSettings();

  const setUsername = useCallback(({ username }) => {
    usernameSettingsMutation.mutate(username, {
      onSuccess: () => {
        toast({
          description: "유저이름이 변경되었습니다",
          position: "top",
          status: "success",
          isClosable: true,
        });
      },
      onError: (error) => {
        if (error.response) {
          const { code } = error.response.data;
          if (code === "user-001") {
            setError("username", { type: "unique", message: "이미 사용 중인 유저이름 입니다" });
          }
        }
      },
    });
  }, []);

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(setUsername)}
      direction="column"
      alignItems="flex-end"
      rowGap={4}
    >
      <FormControl isInvalid={Boolean(errors.username)}>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel htmlFor="username" width={{ md: "25%" }}>
            유저이름
          </FormLabel>
          <Box flexGrow={{ md: 1 }}>
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
                validate: {
                  isChanged: (newUsername) =>
                    data !== newUsername || "입력하신 유저이름이 기존 유저이름과 동일합니다",
                },
              })}
            />
            {errors.username ? (
              <FormErrorMessage>{errors.username.message}</FormErrorMessage>
            ) : null}
          </Box>
        </Flex>
      </FormControl>
      <Button
        type="submit"
        size="sm"
        colorScheme="main"
        isDisabled={usernameSettingsMutation.isLoading}
        isLoading={usernameSettingsMutation.isLoading}
        loadingText="수정 중..."
      >
        수정하기
      </Button>
    </Flex>
  );
}

UsernameSettingsForm.propTypes = {
  data: PropTypes.string.isRequired,
};
