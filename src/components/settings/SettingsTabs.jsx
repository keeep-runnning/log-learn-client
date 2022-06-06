import { memo } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import pageUrl from "../../utils/pageUrl";

export const settingsTabType = Object.freeze({
  MAIN: "main",
  PASSWORD: "password",
  INTRODUCTION: "introduction"
});

const settingsTabLabel = Object.freeze({
  [settingsTabType.MAIN]: "기본 정보",
  [settingsTabType.PASSWORD]: "비밀번호 수정",
  [settingsTabType.INTRODUCTION]: "소개 수정"
});

const SettingsTabs = ({ selectedTab }) => {
  return (
    <ul css={theme => css`
      padding: ${theme.spacing[2]};
      display: flex;
      flex-direction: column;
      row-gap: ${theme.spacing[1]};
      ${theme.mq.sm} {
        flex-direction: row;
        column-gap: ${theme.spacing[2]};
      }
    `}>
      {Object.entries(settingsTabLabel).map(([type, label]) => (
        <li key={type}
            css={theme => css`
              padding: ${theme.spacing[2]} ${theme.spacing[4]};
              color: ${theme.textColor[4]};
              ${theme.textSize.sm}
              ${theme.borderRound.normal}
              ${selectedTab === type ? css`
                color: ${theme.textColor[1]};
                background-color: ${theme.primaryColor[3]};
              `: css`
                &:hover {
                  background-color: ${theme.primaryColor[1]};
                }
              `}
              ${theme.mq.sm} {
                ${theme.borderRound.full}
              }
            `}
        >
          <Link css={css`display: block; `} to={pageUrl.getSettingsPageUrl(type)}>{label}</Link>
        </li>
      ))}
    </ul>
  );
};

SettingsTabs.propTypes = {
  selectedTab: PropTypes.oneOf(Object.values(settingsTabType)).isRequired,
};

export default memo(SettingsTabs);
