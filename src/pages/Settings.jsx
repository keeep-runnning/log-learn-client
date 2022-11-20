import { Outlet } from "react-router-dom";
import useSettingsQuery from "../hooks/queries/settings/useSettingsQuery";
import { Container, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import NavLinkTabs from "../components/common/NavLinkTabs";
import pageUrl from "../utils/pageUrl";

export default function Settings() {
  const { data: settingsData, isLoading, isError } = useSettingsQuery();

  if (isLoading) {
    return <Spinner color="main.500" size="lg" />;
  }

  if (isError) {
    return <Text>설정 정보를 가져오는 동안 문제가 발생했습니다</Text>;
  }

  return (
    <Container maxW="container.lg">
      <Flex direction="column" rowGap={{ base: 6, md: 8 }}>
        <Heading as="h1" fontSize="2xl" fontWeight="bold">
          설정
        </Heading>
        <NavLinkTabs navLinks={settingsNavLinks} />
        <Outlet context={{ settingsData }} />
      </Flex>
    </Container>
  );
}

const settingsNavLinks = [
  { name: "기본 정보", link: pageUrl.getSettingsPageUrl() },
  { name: "비밀번호 수정", link: pageUrl.getSettingsPageUrl(pageUrl.PASSWORD) },
  { name: "소개 수정", link: pageUrl.getSettingsPageUrl(pageUrl.INTRODUCTION) },
];
