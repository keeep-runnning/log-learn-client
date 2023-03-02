import { StackDivider, VStack } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import UsernameSettingForm from "../../components/auth/UsernameSettingForm";
import EmailSettingForm from "../../components/auth/EmailSettingForm";
import ShortIntroductionSettingForm from "../../components/auth/ShortIntroductionSettingForm";
import IntroductionSettingForm from "../../components/auth/IntroductionSettingForm";
import { pagePath } from "../../utils/page";
import useMeQuery from "../../hooks/auth/useMeQuery";
import LoadingMessage from "../../components/LoadingMessage";
import BaseContainer from "../../components/BaseContainer";

export default function MainSetting() {
  const me = useMeQuery();

  if (me.data) {
    if (me.data.status === "loggedOut") {
      return <Navigate to={pagePath.getLogin()} replace />;
    }

    const { username, email, shortIntroduction, introduction } = me.data.myProfile;

    return (
      <BaseContainer>
        <VStack alignItems="stretch" spacing={10} divider={<StackDivider borderColor="gray.300" />}>
          <UsernameSettingForm defaultUsername={username} />
          <EmailSettingForm defaultEmail={email} />
          <ShortIntroductionSettingForm defaultShortIntroduction={shortIntroduction} />
          <IntroductionSettingForm defaultIntroduction={introduction} />
        </VStack>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <LoadingMessage />
    </BaseContainer>
  );
}
