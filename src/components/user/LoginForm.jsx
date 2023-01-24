import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function LoginForm() {
  return (
    <Flex as="form" noValidate direction="column" rowGap={4}>
      <FormControl>
        <FormLabel htmlFor="email">이메일</FormLabel>
        <Input id="email" type="email" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">비밀번호</FormLabel>
        <Input id="password" type="password" />
      </FormControl>
      <Button type="submit" colorScheme="main" loadingText="로그인 중...">
        로그인
      </Button>
    </Flex>
  );
}
