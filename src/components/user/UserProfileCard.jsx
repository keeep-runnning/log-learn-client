import { Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function UserProfileCard({ userData }) {
  return (
    <Flex
      as="article"
      direction="column"
      alignItems="center"
      rowGap={{ base: 4, md: 6 }}
      p={{ base: 4, md: 6 }}
      borderColor="gray.300"
      borderWidth="2px"
      borderRadius="md"
    >
      <Text fontWeight="bold" fontSize={{ base: "2xl", md: "3xl" }}>
        {userData.username}
      </Text>
      {userData.shortIntroduction ? (
        <Text>{userData.shortIntroduction}</Text>
      ) : (
        <Text color="gray.500">짧은 소개가 작성되지 않았습니다</Text>
      )}
    </Flex>
  );
}

UserProfileCard.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    shortIntroduction: PropTypes.string,
  }).isRequired,
};
