import { Button, ButtonGroup, Center, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import BaseContainer from "./BaseContainer";

type GlobalErrorBoundaryProps = {
  children: ReactNode;
};

function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  const handleClickHomeButton = () => {
    resetErrorBoundary();
    navigate("/");
  };

  return (
    <BaseContainer>
      <Center minHeight="100vh" p={6}>
        <Flex
          role="alert"
          direction="column"
          rowGap={6}
          p={6}
          borderColor="gray.300"
          borderWidth="thin"
          borderRadius="md"
        >
          <Text fontSize="lg">
            알 수 없는 <Text as="strong">에러</Text>가 발생했습니다. <br />
            <Text as="strong">에러</Text>가 계속 발생하면,{" "}
            {process.env.APP_NAME}팀으로 <Text as="strong">문의</Text>해주세요.
          </Text>
          <ButtonGroup size="sm" alignSelf="center">
            <Button type="button" onClick={handleClickHomeButton}>
              메인 페이지로
            </Button>
            <Button
              type="button"
              onClick={resetErrorBoundary}
              colorScheme="main"
            >
              다시 시도
            </Button>
          </ButtonGroup>
        </Flex>
      </Center>
    </BaseContainer>
  );
}

export default function GlobalErrorBoundary({
  children,
}: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
