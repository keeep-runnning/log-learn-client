import { css } from "@emotion/react";

import UsernameSettingsForm from "./UsernameSettingsForm";
import EmailSettingsForm from "./EmailSettingsForm";
import ShortIntroductionSettingsForm from "./ShortIntroductionSettingsForm";

const MainSettingsForms = () => {
  return (
    <div css={theme => css`
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
    `}>
      <UsernameSettingsForm />
      <EmailSettingsForm />
      <ShortIntroductionSettingsForm />
    </div>
  );
};

export default MainSettingsForms;
