import { Flex, Heading, Text } from "@chakra-ui/react";

import EmptyMessage from "../EmptyMessage";
import { UserProfile } from "../../types/users";

type UserProfileCardProps = {
  userProfile: UserProfile;
};

export default function UserProfileCard({ userProfile }: UserProfileCardProps) {
  return (
    <Flex
      as="article"
      direction="column"
      alignItems="center"
      rowGap={{ base: 4, md: 6 }}
      p={{ base: 4, md: 6 }}
      borderColor="gray.300"
      borderWidth="thin"
      borderRadius="md"
    >
      <Heading fontWeight="bold" fontSize={{ base: "2xl", md: "3xl" }}>
        {userProfile.username}
      </Heading>
      {userProfile.shortIntroduction ? (
        <Text>{userProfile.shortIntroduction}</Text>
      ) : (
        <EmptyMessage message="짧은 소개가 작성되지 않았습니다" />
      )}
    </Flex>
  );
}
