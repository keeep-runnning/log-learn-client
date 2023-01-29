import logoImage from "../../assets/logo.png";
import { Flex, Image, Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Flex alignItems="center" columnGap={2}>
      <Image src={logoImage} alt="logo" boxSize="28px" />
      <Text fontSize="2xl" fontWeight="bold" as="span">
        log learn
      </Text>
    </Flex>
  );
}
