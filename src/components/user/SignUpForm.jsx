import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function SignUpForm() {
  return (
    <Flex as="form" noValidate direction="column" rowGap={4}>
      <FormControl>
        <FormLabel htmlFor="username">유저이름</FormLabel>
        <Input id="username" type="text" placeholder="유저이름" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">이메일</FormLabel>
        <Input id="email" type="email" placeholder="example@example.com" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">비밀번호</FormLabel>
        <Input id="password" type="password" placeholder="********" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="passwordCheck">비밀번호 확인</FormLabel>
        <Input id="passwordCheck" type="password" placeholder="********" />
      </FormControl>
      <Button type="submit" colorScheme="main" loadingText="회원가입 중...">
        회원가입
      </Button>
    </Flex>
  );
}
