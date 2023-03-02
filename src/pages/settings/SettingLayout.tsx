import { Outlet } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";

import NavLinkTabs from "../../components/NavLinkTabs";
import { pagePath } from "../../utils/page";
import BaseContainer from "../../components/BaseContainer";

export default function SettingLayout() {
  return (
    <Flex direction="column" rowGap={{ base: 6, md: 8 }}>
      <BaseContainer>
        <Heading as="h1" fontSize="2xl" fontWeight="bold">
          설정
        </Heading>
      </BaseContainer>
      <BaseContainer>
        <NavLinkTabs tabs={settingsNavLinks} />
      </BaseContainer>
      <Outlet />
    </Flex>
  );
}

const settingsNavLinks = [
  { name: "기본 정보", link: pagePath.getSetting() },
  { name: "비밀번호 수정", link: pagePath.getPasswordSetting() },
];
