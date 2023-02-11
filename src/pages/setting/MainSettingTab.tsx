import { Flex, Spinner, StackDivider, Text, VStack } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import UsernameSettingForm from "../../components/setting/UsernameSettingForm";
import EmailSettingForm from "../../components/setting/EmailSettingForm";
import ShortIntroductionSettingForm from "../../components/setting/ShortIntroductionSettingForm";
import IntroductionSettingForm from "../../components/setting/IntroductionSettingForm";
import useSettingQuery from "../../hooks/useSettingQuery";
import pageUrl from "../../utils/pageUrl";

export default function MainSettingTab() {
  const setting = useSettingQuery();

  if (setting.isSuccess) {
    const { data } = setting;
    if (data.result === "loaded") {
      return (
        <VStack alignItems="stretch" spacing={10} divider={<StackDivider borderColor="gray.300" />}>
          <UsernameSettingForm defaultUsername={data.username} />
          <EmailSettingForm defaultEmail={data.email} />
          <ShortIntroductionSettingForm defaultShortIntroduction={data.shortIntroduction} />
          <IntroductionSettingForm defaultIntroduction={data.introduction} />
        </VStack>
      );
    } else {
      return <Navigate to={pageUrl.getLoginPageUrl()} />;
    }
  }

  if (setting.isLoading) {
    return (
      <Flex direction="column" alignItems="center" rowGap={6} p={6}>
        <Spinner size="lg" color="main.500" />
        <Text>설정 정보를 가져오는 중입니다...</Text>
      </Flex>
    );
  }

  return null;
}
