import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

import SettingsTabs from "../components/settings/SettingsTabs";
import useSettingsQuery from "../hooks/queries/settings/useSettingsQuery";

const Settings = () => {
  const { data: settingsData, isLoading, isError } = useSettingsQuery();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>설정 정보를 가져오는 동안 문제가 발생했습니다.</div>;
  }

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
    `}>
      <h1 css={theme => css`
        font-weight: ${theme.textWeight.bold};
        ${theme.textSize["2xl"]}
      `}>
        설정
      </h1>
      <SettingsTabs />
      <section css={css`flex-grow: 1; `}>
        <Outlet context={{ settingsData }} />
      </section>
    </div>
  );
};

export default Settings;
