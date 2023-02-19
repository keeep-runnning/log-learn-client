import { Link } from "react-router-dom";

import LoginForm from "../../components/user/LoginForm";
import { pagePath } from "../../utils/page";
import { Container, Flex, Text } from "@chakra-ui/react";
import AuthFormHeader from "../../components/user/AuthFormHeader";

export default function Login() {
  return (
    <Container maxW="320px">
      <Flex as="section" direction="column" rowGap={6}>
        <AuthFormHeader title="로그인" />
        <LoginForm />
        <Text fontSize="sm" textAlign="center">
          아직 계정이 없으신가요?{" "}
          <Link to={pagePath.getSignUp()}>
            <Text as="span" _hover={{ fontWeight: "bold" }}>
              회원가입 &gt;
            </Text>
          </Link>
        </Text>
      </Flex>
    </Container>
  );
}
