import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { css } from "@emotion/react";

import SettingsTabs, { settingsTabType } from "../components/settings/SettingsTabs";
import MainSettingsForms from "../components/settings/MainSettingsForms";
import PasswordSettingsForm from "../components/settings/PasswordSettingsForm";
import IntroductionSettingsForm from "../components/settings/IntroductionSettingsForm";
import useSettingsQuery from "../hooks/queries/settings/useSettingsQuery";

function isTabQueryStringValid(tabQueryString) {
  return Object.values(settingsTabType).includes(tabQueryString);
}

function getSelectedTabFromTabQueryString(tabQueryString) {
  if(!tabQueryString || !isTabQueryStringValid(tabQueryString)) {
    return settingsTabType.MAIN;
  }
  return tabQueryString;
}

const Settings = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const tabQueryString = searchParams.get("tab");

  const [selectedTab, setSelectedTab] = useState(getSelectedTabFromTabQueryString(tabQueryString));

  useEffect(() => {
    if (tabQueryString && !isTabQueryStringValid(tabQueryString)) {
      navigate("/settings");
    } else {
      setSelectedTab(getSelectedTabFromTabQueryString(tabQueryString));
    }
  }, [tabQueryString]);

  const { data, isLoading, isError } = useSettingsQuery();

  return (
    <div css={theme => css`
      height: 100%;
      display: flex;
      flex-direction: column;
      row-gap: ${theme.spacing[6]};
      padding: ${theme.spacing[4]};
      ${theme.mq.md} {
        max-width: ${theme.bp.md};
        margin: 0 auto;
        row-gap: ${theme.spacing[8]};
      }
      & > section {
        flex-grow: 1;
      }
      & > h1 {
        font-weight: ${theme.textWeight.bold};
        ${theme.textSize["2xl"]}
      }
    `}>
      <h1>설정</h1>
      <SettingsTabs selectedTab={selectedTab} />
      <section>
        {isLoading && <div>loading...</div>}
        {isError && <div>설정 정보를 가져오는 동안 문제가 발생했습니다.</div>}
        {data && (
          selectedTab === settingsTabType.MAIN ? <MainSettingsForms data={data} /> :
            selectedTab === settingsTabType.PASSWORD ? <PasswordSettingsForm /> :
              <IntroductionSettingsForm data={data.introduction} />
        )}
      </section>
    </div>
  );
};

export default Settings;
