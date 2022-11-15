import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import useShortIntroductionSettings from "../../hooks/queries/settings/useShortIntroductionSettings";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";

export default function ShortIntroductionSettingsForm({ data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shortIntroduction: data,
    },
    mode: "onChange",
  });

  const shortIntroductionSettingsMutation = useShortIntroductionSettings();

  const toast = useToast();

  const setShortIntroduction = useCallback(({ shortIntroduction }) => {
    shortIntroductionSettingsMutation.mutate(shortIntroduction, {
      onSuccess: () => {
        toast({
          description: "짧은 소개가 수정되었습니다",
          position: "top",
          status: "success",
          isClosable: true,
        });
      },
    });
  }, []);

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(setShortIntroduction)}
      direction="column"
      alignItems="flex-end"
      rowGap={4}
    >
      <FormControl isInvalid={Boolean(errors.shortIntroduction)}>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width="25%" htmlFor="shortIntroduction">
            짧은 소개
          </FormLabel>
          <Box flexGrow={1}>
            <Textarea
              id="shortIntroduction"
              rows={4}
              {...register("shortIntroduction", {
                maxLength: {
                  value: 120,
                  message: "짧은 소개를 120자 이하로 입력해주세요",
                },
                validate: {
                  isChanged: (newShortIntroduction) =>
                    data !== newShortIntroduction || "변경사항이 없습니다",
                },
              })}
            />
            {errors.shortIntroduction ? (
              <FormErrorMessage>{errors.shortIntroduction.message}</FormErrorMessage>
            ) : null}
          </Box>
        </Flex>
      </FormControl>
      <Button
        type="submit"
        size="sm"
        colorScheme="main"
        isDisabled={shortIntroductionSettingsMutation.isLoading}
        isLoading={shortIntroductionSettingsMutation.isLoading}
        loadingText="수정 중..."
      >
        수정하기
      </Button>
    </Flex>
  );
}

ShortIntroductionSettingsForm.propTypes = {
  data: PropTypes.string.isRequired,
};
