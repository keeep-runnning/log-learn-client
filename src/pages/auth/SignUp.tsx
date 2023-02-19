import { Link } from "react-router-dom";

import SignUpForm from "../../components/user/SignUpForm";
import { pagePath } from "../../utils/page";
import { Container, Flex, Text } from "@chakra-ui/react";
import AuthFormHeader from "../../components/user/AuthFormHeader";

export default function SignUp() {
  return (
    <Container maxW="320px">
      <Flex as="section" direction="column" rowGap={6}>
        <AuthFormHeader title="회원가입" />
        <SignUpForm />
        <Text textAlign="center" fontSize="sm">
          가입시, log learn의{" "}
          <Text as="strong" color="main.500" fontWeight="bold">
            이용약관
          </Text>
          에 동의합니다
        </Text>
        <Text textAlign="center" fontSize="sm">
          이미 계정이 있으신가요?{" "}
          <Link to={pagePath.getLogin()}>
            <Text as="span" _hover={{ fontWeight: "bold" }}>
              로그인 하기 &gt;
            </Text>
          </Link>
        </Text>
      </Flex>
    </Container>
  );
}
