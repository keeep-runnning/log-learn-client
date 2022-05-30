import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { css } from "@emotion/react";

import useCurrentUserQuery from "../hooks/queries/auth/useCurrentUserQuery";
import SettingsTabs, { settingsTabType } from "../components/settings/SettingsTabs";
import MainSettingsForms from "../components/settings/MainSettingsForms";

function isTabQueryStringValid(tab) {
  return Object.values(settingsTabType).includes(tab);
}

function getSelectedTabFromTabQueryString(tab) {
  if(!tab || !isTabQueryStringValid(tab)) {
    return settingsTabType.MAIN;
  }
  return tab;
}

const Settings = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useCurrentUserQuery();

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const [selectedTab, setSelectedTab] = useState(getSelectedTabFromTabQueryString(tab));

  useEffect(() => {
    if (tab && !isTabQueryStringValid(tab)) {
      navigate("/settings");
    } else {
      setSelectedTab(getSelectedTabFromTabQueryString(tab));
    }
  }, [tab]);

  const handleTabClick = useCallback(clickedTabType => {
    setSelectedTab(clickedTabType);
  }, []);

  return (
    <div css={theme => css`
      display: flex;
      flex-direction: column;
      row-gap: ${theme.spacing[6]};
      padding: ${theme.spacing[4]};
      ${theme.mq.md} {
        max-width: ${theme.bp.md};
        margin: 0 auto;
        row-gap: ${theme.spacing[8]};
      }
    `}>
      <h1 css={theme => css`
        font-weight: ${theme.textWeight.bold};
        ${theme.textSize["2xl"]}
      `}>
        설정
      </h1>
      <SettingsTabs selectedTab={selectedTab} onTabClick={handleTabClick} />
      {selectedTab === settingsTabType.MAIN && <MainSettingsForms />}
    </div>
  );
};

export default Settings;
