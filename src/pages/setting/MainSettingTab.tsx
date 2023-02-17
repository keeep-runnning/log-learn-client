import { StackDivider, VStack } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import UsernameSettingForm from "../../components/setting/UsernameSettingForm";
import EmailSettingForm from "../../components/setting/EmailSettingForm";
import ShortIntroductionSettingForm from "../../components/setting/ShortIntroductionSettingForm";
import IntroductionSettingForm from "../../components/setting/IntroductionSettingForm";
import { pagePath } from "../../utils/page";
import useMeQuery from "../../hooks/useMeQuery";
import LoadingMessage from "../../components/common/LoadingMessage";

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

  return <LoadingMessage />;
}
