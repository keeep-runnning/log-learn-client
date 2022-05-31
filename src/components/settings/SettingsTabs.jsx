import { memo } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
      column-gap: ${theme.spacing[4]};
    `}>
      {Object.entries(settingsTabLabel).map(([type, label]) => (
        <li key={type}>
          <Link to={`/settings?tab=${type}`}
            css={theme => css`
              display: block;
              padding: ${theme.spacing[2]} ${theme.spacing[4]};
              color: ${theme.textColor[4]};
              ${theme.textSize.sm}
              ${theme.borderRound.full}
              ${selectedTab === type && css`
                color: ${theme.textColor[1]};
                background-color: ${theme.primaryColor[3]};
              `}
            `}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

SettingsTabs.propTypes = {
  selectedTab: PropTypes.oneOf(Object.values(settingsTabType)).isRequired,
};

export default memo(SettingsTabs);
