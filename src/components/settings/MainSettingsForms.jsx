import { css } from "@emotion/react";
import { useOutletContext } from "react-router-dom";

import UsernameSettingsForm from "./UsernameSettingsForm";
import EmailSettingsForm from "./EmailSettingsForm";
import ShortIntroductionSettingsForm from "./ShortIntroductionSettingsForm";

const MainSettingsForms = () => {
  const { settingsData } = useOutletContext();

  return (
    <div
      css={(theme) => css`
        display: flex;
        flex-direction: column;
        row-gap: ${theme.spacing[8]};
        & > * + * {
          position: relative;
          &::before {
            content: "";
            background-color: ${theme.lineColor[3]};
            width: 100%;
            height: 0.5px;
            position: absolute;
            left: 0;
            top: -${theme.spacing[4]};
          }
        }
      `}
    >
      <UsernameSettingsForm data={settingsData.username} />
      <EmailSettingsForm data={settingsData.email} />
      <ShortIntroductionSettingsForm data={settingsData.shortIntroduction} />
    </div>
  );
};

export default MainSettingsForms;
