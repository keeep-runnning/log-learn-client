import { useParams, Outlet } from "react-router-dom";
import { Container, Flex, Spinner, Text } from "@chakra-ui/react";

import { pagePath } from "../utils/page";
import UserProfileCard from "../components/user/UserProfileCard";
import NavLinkTabs from "../components/common/NavLinkTabs";
import useUserInfoQuery from "../hooks/useUserInfoQuery";
import NotFound from "./NotFound";

export default function UserBlog() {
  const params = useParams();
  const usernameParam: string = params.username!;

  const userInfoQuery = useUserInfoQuery(usernameParam);

  if (userInfoQuery.data) {
    if (userInfoQuery.data.result === "notFound") {
      return <NotFound />;
    }

    const { username, shortIntroduction } = userInfoQuery.data;

    return (
      <Container maxW="container.lg">
        <Flex direction="column" rowGap={8}>
          <UserProfileCard user={{ username, shortIntroduction }} />
          <NavLinkTabs
            navLinkTabs={[
              { name: "포스트", link: pagePath.getUserBlog(username) },
              { name: "소개", link: pagePath.getUserIntroduction(username) },
            ]}
          />
          <Outlet />
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg">
      <Flex px={4} py={8} direction="column" rowGap={6} alignItems="center">
        <Spinner color="main.500" />
        <Text fontSize="2xl">잠시 기다려주세요</Text>
      </Flex>
    </Container>
  );
}
