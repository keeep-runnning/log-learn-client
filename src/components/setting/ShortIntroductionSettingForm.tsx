import { Box, Button, Flex, FormControl, FormLabel, Textarea } from "@chakra-ui/react";

type ShortIntroductionSettingFormProps = {
  defaultShortIntroduction: string;
};

export default function ShortIntroductionSettingForm({
  defaultShortIntroduction,
}: ShortIntroductionSettingFormProps) {
  return (
    <Flex as="form" direction="column" rowGap={4}>
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width="25%" htmlFor="shortIntroduction">
            짧은 소개
          </FormLabel>
          <Box flexGrow={1}>
            <Textarea id="shortIntroduction" rows={4} defaultValue={defaultShortIntroduction} />
          </Box>
        </Flex>
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
