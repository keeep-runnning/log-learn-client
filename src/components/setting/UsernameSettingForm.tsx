import { Box, Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function UsernameSettingForm() {
  return (
    <Flex as="form" direction="column" alignItems="flex-end" rowGap={4}>
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel htmlFor="username" width={{ md: "25%" }}>
            유저이름
          </FormLabel>
          <Box flexGrow={{ md: 1 }}>
            <Input id="username" type="text" />
          </Box>
        </Flex>
      </FormControl>
      <Button type="submit" size="sm" colorScheme="main" loadingText="수정 중...">
        수정하기
      </Button>
    </Flex>
  );
}
