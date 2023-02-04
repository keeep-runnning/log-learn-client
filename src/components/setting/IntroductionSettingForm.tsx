import { Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";

export default function IntroductionSettingForm() {
  return (
    <Flex as="form" direction="column" rowGap={4}>
      <FormControl>
        <FormLabel>소개</FormLabel>
      </FormControl>
      <Button
        type="submit"
        size="sm"
        colorScheme="main"
        loadingText="수정 중..."
        alignSelf="flex-end"
      >
        수정하기
      </Button>
    </Flex>
  );
}
