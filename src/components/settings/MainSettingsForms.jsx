import { useOutletContext } from "react-router-dom";
import UsernameSettingsForm from "./UsernameSettingsForm";
import EmailSettingsForm from "./EmailSettingsForm";
import ShortIntroductionSettingsForm from "./ShortIntroductionSettingsForm";
import { StackDivider, VStack } from "@chakra-ui/react";

export default function MainSettingsForms() {
  const { settingsData } = useOutletContext();

  return (
    <VStack alignItems="stretch" spacing={10} divider={<StackDivider borderColor="gray.300" />}>
      <UsernameSettingsForm data={settingsData.username} />
      <EmailSettingsForm data={settingsData.email} />
      <ShortIntroductionSettingsForm data={settingsData.shortIntroduction} />
    </VStack>
  );
}
