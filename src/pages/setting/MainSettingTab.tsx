import { Flex, Spinner, StackDivider, Text, VStack } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import UsernameSettingForm from "../../components/setting/UsernameSettingForm";
import EmailSettingForm from "../../components/setting/EmailSettingForm";
import ShortIntroductionSettingForm from "../../components/setting/ShortIntroductionSettingForm";
import IntroductionSettingForm from "../../components/setting/IntroductionSettingForm";
import { pagePath } from "../../utils/page";
import useMeQuery from "../../hooks/useMeQuery";

export default function MainSettingTab() {
  const me = useMeQuery();

  if (me.data) {
    if (!me.data.isLoggedIn) {
      return <Navigate to={pagePath.getLogin()} replace />;
    }

    const { username, email, shortIntroduction, introduction } = me.data;
    return (
      <VStack alignItems="stretch" spacing={10} divider={<StackDivider borderColor="gray.300" />}>
        <UsernameSettingForm defaultUsername={username} />
        <EmailSettingForm defaultEmail={email} />
        <ShortIntroductionSettingForm defaultShortIntroduction={shortIntroduction} />
        <IntroductionSettingForm defaultIntroduction={introduction} />
      </VStack>
    );
  }

  if (me.isError) {
    return null;
  }

  return (
    <Flex direction="column" alignItems="center" rowGap={6} p={6}>
      <Spinner size="lg" color="main.500" />
      <Text>설정 정보를 가져오는 중입니다...</Text>
    </Flex>
  );
}
