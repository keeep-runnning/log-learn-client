import { Outlet } from "react-router-dom";
import SettingsTabs from "../components/settings/SettingsTabs";
import useSettingsQuery from "../hooks/queries/settings/useSettingsQuery";
import { Container, Flex, Heading, Spinner, Text } from "@chakra-ui/react";

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
      <Flex direction="column" rowGap={6}>
        <Heading as="h1" fontSize="2xl" fontWeight="bold">
          설정
        </Heading>
        <SettingsTabs />
        <Outlet context={{ settingsData }} />
      </Flex>
    </Container>
  );
}
