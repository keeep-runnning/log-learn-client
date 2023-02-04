import { Outlet } from "react-router-dom";
import { Container, Flex, Heading } from "@chakra-ui/react";

import NavLinkTabs from "../../components/common/NavLinkTabs";
import pageUrl from "../../utils/pageUrl";

export default function Setting() {
  return (
    <Container maxW="container.lg">
      <Flex direction="column" rowGap={{ base: 6, md: 8 }}>
        <Heading as="h1" fontSize="2xl" fontWeight="bold">
          설정
        </Heading>
        <NavLinkTabs navLinkTabs={settingsNavLinks} />
        <Outlet />
      </Flex>
    </Container>
  );
}

const settingsNavLinks = [
  { name: "기본 정보", link: pageUrl.getSettingsPageUrl() },
  { name: "비밀번호 수정", link: pageUrl.getSettingsPageUrl(pageUrl.PASSWORD) },
];
