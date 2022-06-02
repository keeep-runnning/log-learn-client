import { css } from "@emotion/react";
import PropTypes from "prop-types";

import UsernameSettingsForm from "./UsernameSettingsForm";
import EmailSettingsForm from "./EmailSettingsForm";
import ShortIntroductionSettingsForm from "./ShortIntroductionSettingsForm";

const MainSettingsForms = ({ data }) => {
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
      <UsernameSettingsForm data={data.username} />
      <EmailSettingsForm data={data.email} />
      <ShortIntroductionSettingsForm data={data.shortIntroduction} />
    </div>
  );
};

MainSettingsForms.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    shortIntroduction: PropTypes.string.isRequired
  }).isRequired
}

export default MainSettingsForms;
