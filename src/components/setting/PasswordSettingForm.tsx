import { Box, Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function PasswordSettingForm() {
  return (
    <Flex as="form" direction="column" rowGap={6} alignItems="flex-end">
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width={{ md: "25%" }} htmlFor="password">
            기존 비밀번호
          </FormLabel>
          <Box flexGrow={{ md: 1 }}>
            <Input id="password" type="password" />
          </Box>
        </Flex>
      </FormControl>
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width={{ md: "25%" }} htmlFor="newPassword">
            새 비밀번호
          </FormLabel>
          <Box flexGrow={{ md: 1 }}>
            <Input id="newPassword" type="password" />
          </Box>
        </Flex>
      </FormControl>
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width={{ md: "25%" }} htmlFor="newPasswordCheck">
            새 비밀번호 확인
          </FormLabel>
          <Box flexGrow={{ md: 1 }}>
            <Input id="newPasswordCheck" type="password" />
          </Box>
        </Flex>
      </FormControl>
      <Button type="submit" size="sm" colorScheme="main" loadingText="수정 중...">
        수정하기
      </Button>
    </Flex>
  );
}
