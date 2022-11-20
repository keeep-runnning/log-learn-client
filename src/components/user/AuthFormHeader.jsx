import { Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function AuthFormHeader({ title }) {
  return (
    <Flex as="header" direction="column" alignItems="center" rowGap={2}>
      <Link to="/">
        <Text as="span" color="gray.800">
          log learn
        </Text>
      </Link>
      <Heading as="h1" fontSize="3xl">
        {title}
      </Heading>
    </Flex>
  );
}

AuthFormHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
