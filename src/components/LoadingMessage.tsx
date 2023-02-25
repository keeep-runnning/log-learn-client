import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function LoadingMessage({ message = "잠시 기다려주세요" }) {
  return (
    <Flex px={4} py={8} direction="column" rowGap={6} alignItems="center">
      <Spinner color="main.500" />
      <Text fontSize="2xl">{message}</Text>
    </Flex>
  );
}
