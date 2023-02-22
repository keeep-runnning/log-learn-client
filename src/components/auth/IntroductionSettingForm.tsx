import { FormEvent, useState } from "react";
import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, useToast } from "@chakra-ui/react";

import Editor from "../editor/Editor";
import useIntroductionSetting from "../../hooks/auth/useIntroductionSetting";
import useHandleUnauthenticatedError from "../../hooks/auth/useHandleUnauthenticatedError";

type IntroductionSettingFormProps = {
  defaultIntroduction: string;
};

export default function IntroductionSettingForm({
  defaultIntroduction,
}: IntroductionSettingFormProps) {
  const [introduction, setIntroduction] = useState(defaultIntroduction);

  const toast = useToast();

  const introductionSettingMutation = useIntroductionSetting();

  const handleUnauthenticatedError = useHandleUnauthenticatedError();

  const handleSubmit = (e: FormEvent<HTMLDivElement>): void => {
    e.preventDefault();

    introductionSettingMutation.mutate(introduction, {
      onSuccess: (introductionSettingResult) => {
        if (introductionSettingResult.result === "submitted") {
          toast({
            description: "소개가 수정되었습니다",
            status: "success",
            position: "top",
            isClosable: true,
          });
        } else if (introductionSettingResult.result === "unauthenticated") {
          handleUnauthenticatedError();
        }
      },
    });
  };

  const handleClickClearButton = () => {
    setIntroduction("");
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} direction="column" rowGap={4}>
      <FormControl as={Flex} direction={{ base: "column", md: "row" }}>
        <FormLabel width={{ md: "25%" }}>소개</FormLabel>
        <Box height="560px" flexGrow={{ md: 1 }}>
          <Editor value={introduction} onChange={setIntroduction} />
        </Box>
      </FormControl>
      <ButtonGroup variant="ghost" size="sm" justifyContent="flex-end">
        <Button type="button" colorScheme="red" onClick={handleClickClearButton}>
          전체 지우기
        </Button>
        <Button
          type="submit"
          colorScheme="main"
          isLoading={introductionSettingMutation.isLoading}
          loadingText="수정 중..."
        >
          수정하기
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
