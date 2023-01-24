import { useParams, Outlet } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";

import pageUrl from "../utils/pageUrl";
import UserProfileCard from "../components/user/UserProfileCard";
import NavLinkTabs from "../components/common/NavLinkTabs";

export default function UserHome() {
  const { username } = useParams();

  const dummyUser = {
    username,
    shortIntroduction: "dummy short introduction",
    introduction: "dummy introduction",
  };

  return (
    <Container maxW="container.lg">
      <Flex direction="column" rowGap={8}>
        <UserProfileCard userData={dummyUser} />
        <NavLinkTabs
          navLinks={[
            { name: "포스트", link: pageUrl.getUserHomePageUrl(dummyUser.username) },
            { name: "소개", link: pageUrl.getUserIntroductionPageUrl(dummyUser.username) },
          ]}
        />
        <Outlet context={{ userData: dummyUser }} />
      </Flex>
    </Container>
  );
}
