import { Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function EmptyMessage({ message }) {
  return (
    <Text fontSize={{ md: "lg" }} textAlign="center" px={2} py={4} color="gray.500">
      {message}
    </Text>
  );
}

EmptyMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
