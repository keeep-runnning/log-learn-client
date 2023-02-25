import { Text } from "@chakra-ui/react";

type EmptyMessageProps = {
  message: string;
};

export default function EmptyMessage({ message }: EmptyMessageProps) {
  return (
    <Text fontSize={{ md: "lg" }} textAlign="center" px={2} py={4} color="gray.500">
      {message}
    </Text>
  );
}
