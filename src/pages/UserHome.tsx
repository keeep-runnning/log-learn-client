import { useParams, Outlet } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";

import { pagePath } from "../utils/page";
import UserProfileCard from "../components/user/UserProfileCard";
import NavLinkTabs from "../components/common/NavLinkTabs";

export default function UserHome() {
  const { username } = useParams();

  const dummyUser = {
    username: username ?? "",
    shortIntroduction: "dummy short introduction",
    introduction: "dummy introduction",
  };

  return (
    <Container maxW="container.lg">
      <Flex direction="column" rowGap={8}>
        <UserProfileCard user={dummyUser} />
        <NavLinkTabs
          navLinkTabs={[
            { name: "포스트", link: pagePath.getUserHome(dummyUser.username) },
            { name: "소개", link: pagePath.getUserIntroduction(dummyUser.username) },
          ]}
        />
        <Outlet context={{ userData: dummyUser }} />
      </Flex>
    </Container>
  );
}
