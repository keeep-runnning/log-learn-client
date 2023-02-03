import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

export default function IntroductionSettingsForm() {
  return (
    <Flex as="form" direction="column" rowGap={4}>
      <ButtonGroup size="sm" justifyContent="flex-end">
        <Button type="submit" colorScheme="main" loadingText="수정 중...">
          수정하기
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
