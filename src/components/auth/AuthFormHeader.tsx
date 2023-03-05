import { Link } from "react-router-dom";
import { Flex, Heading, Text } from "@chakra-ui/react";

type AuthFormHeaderProps = {
  title: string;
};

export default function AuthFormHeader({ title }: AuthFormHeaderProps) {
  return (
    <Flex as="header" direction="column" alignItems="center" rowGap={2}>
      <Link to="/">
        <Text as="span" color="gray.800">
          {process.env.APP_NAME}
        </Text>
      </Link>
      <Heading as="h1" fontSize="3xl">
        {title}
      </Heading>
    </Flex>
  );
}
