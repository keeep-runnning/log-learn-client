import { memo } from "react";
import PropTypes from "prop-types";

import LinkMenuTabs from "../common/LinkMenuTabs";
import pageUrl from "../../utils/pageUrl";

const UserHomeMenuTabs = ({ username }) => {
  const menuList = [
    { name: "포스트", link: pageUrl.getUserHomePageUrl(username) },
    { name: "소개", link: pageUrl.getUserIntroductionPageUrl(username) },
  ];

  return <LinkMenuTabs menuList={menuList} />;
};

UserHomeMenuTabs.propTypes = {
  username: PropTypes.string.isRequired,
};

export default memo(UserHomeMenuTabs);
