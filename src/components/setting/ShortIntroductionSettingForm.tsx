import { Box, Button, Flex, FormControl, FormLabel, Textarea } from "@chakra-ui/react";

export default function ShortIntroductionSettingForm() {
  return (
    <Flex as="form" direction="column" alignItems="flex-end" rowGap={4}>
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width="25%" htmlFor="shortIntroduction">
            짧은 소개
          </FormLabel>
          <Box flexGrow={1}>
            <Textarea id="shortIntroduction" rows={4} />
          </Box>
        </Flex>
      </FormControl>
      <Button type="submit" size="sm" colorScheme="main" loadingText="수정 중...">
        수정하기
      </Button>
    </Flex>
  );
}
