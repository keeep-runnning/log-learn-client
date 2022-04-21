import { memo } from "react";
import PropTypes from "prop-types";
import {
  IoAlertCircleSharp,
  IoCheckmarkCircleSharp,
  IoInformationCircleSharp,
  IoWarningSharp
} from "react-icons/io5";

import { NOTIFICATION_TYPE } from "../../../constants/notifications";

const notificationIconByType = {
  [NOTIFICATION_TYPE.INFO]: IoInformationCircleSharp,
  [NOTIFICATION_TYPE.SUCCESS]: IoCheckmarkCircleSharp,
  [NOTIFICATION_TYPE.WARNING]: IoWarningSharp,
  [NOTIFICATION_TYPE.DANGER]: IoAlertCircleSharp,
};

const NotificationIcon = ({ type, ...props }) => {
  const Icon = notificationIconByType[type] ?? notificationIconByType["info"];
  return (<Icon {...props} />);
};

NotificationIcon.propTypes = {
  type: PropTypes.oneOf(Object.values(NOTIFICATION_TYPE))
};

export default memo(NotificationIcon);
