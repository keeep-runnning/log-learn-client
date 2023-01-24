import { StackDivider, VStack } from "@chakra-ui/react";

import UsernameSettingsForm from "./UsernameSettingsForm";
import EmailSettingsForm from "./EmailSettingsForm";
import ShortIntroductionSettingsForm from "./ShortIntroductionSettingsForm";

export default function MainSettingsForms() {
  return (
    <VStack alignItems="stretch" spacing={10} divider={<StackDivider borderColor="gray.300" />}>
      <UsernameSettingsForm />
      <EmailSettingsForm />
      <ShortIntroductionSettingsForm />
    </VStack>
  );
}
