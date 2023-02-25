import { Flex, Text } from "@chakra-ui/react";

import EmptyMessage from "../EmptyMessage";

type UserProfileCardProps = {
  user: {
    username: string;
    shortIntroduction: string;
  };
};

export default function UserProfileCard({ user }: UserProfileCardProps) {
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
        {user.username}
      </Text>
      {user.shortIntroduction ? (
        <Text>{user.shortIntroduction}</Text>
      ) : (
        <EmptyMessage message="짧은 소개가 작성되지 않았습니다" />
      )}
    </Flex>
  );
}
