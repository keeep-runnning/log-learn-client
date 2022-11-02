import pageUrl from "../../utils/pageUrl";
import LinkMenuTabs from "../common/LinkMenuTabs";

const SettingsTabs = () => {
  const menuList = [
    { name: "기본 정보", link: pageUrl.getSettingsPageUrl() },
    { name: "비밀번호 수정", link: pageUrl.getSettingsPageUrl(pageUrl.PASSWORD) },
    { name: "소개 수정", link: pageUrl.getSettingsPageUrl(pageUrl.INTRODUCTION) },
  ];

  return <LinkMenuTabs menuList={menuList} />;
};

export default SettingsTabs;
