import { Link } from "react-router-dom";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

import BaseContainer from "./BaseContainer";

export default function NotFound() {
  return (
    <BaseContainer>
      <Flex mt={24} direction="column" alignItems="center" rowGap={12}>
        <Text as="span" fontSize="5xl" fontWeight="bold" color="main.500">
          404
        </Text>
        <Heading as="h1" fontSize="3xl">
          페이지를 찾지 못했습니다
        </Heading>
        <Text>잘못된 주소이거나, 더 이상 제공하지 않는 페이지입니다</Text>
        <Button as={Link} to="/" colorScheme="main">
          메인 페이지로 이동
        </Button>
      </Flex>
    </BaseContainer>
  );
}
