import { StackDivider, VStack } from "@chakra-ui/react";

import UsernameSettingForm from "../../components/setting/UsernameSettingForm";
import EmailSettingForm from "../../components/setting/EmailSettingForm";
import ShortIntroductionSettingForm from "../../components/setting/ShortIntroductionSettingForm";
import IntroductionSettingForm from "../../components/setting/IntroductionSettingForm";

export default function MainSettingTab() {
  return (
    <VStack alignItems="stretch" spacing={10} divider={<StackDivider borderColor="gray.300" />}>
      <UsernameSettingForm />
      <EmailSettingForm />
      <ShortIntroductionSettingForm />
      <IntroductionSettingForm />
    </VStack>
  );
}
