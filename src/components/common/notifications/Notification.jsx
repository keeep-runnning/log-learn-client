import { memo, useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { IoCloseSharp } from "react-icons/io5";
import { css, keyframes } from "@emotion/react";
import PropTypes from "prop-types";

import { notificationsState } from "../../../recoil/notificationsState";
import { NOTIFICATION_TYPE } from "../../../constants/notifications";
import NotificationIcon from "./NotificationIcon";
import DefaultButton from "../buttons/DefaultButton";

const NOTIFICATION_SLIDE_ANIMATION_TIME_IN_MS = 300;
const NOTIFICATION_AUTO_CLOSE_TIME_IN_MS = 7 * 1000;

const notificationSlideDownAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Notification = ({ notification }) => {
  const [isNotificationClosing, setIsNotificationClosing] = useState(false);

  const setNotifications = useSetRecoilState(notificationsState);

  const removeNotification = useCallback(() => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(prevNotification => prevNotification.id !== notification.id)
    );
  }, [notification]);

  const handleCloseButtonClick = useCallback(() => {
    if(isNotificationClosing) return;
    setIsNotificationClosing(true);
  }, [isNotificationClosing]);

  useEffect(() => {
    if(isNotificationClosing) {
      const timerId = setTimeout(() => {
        removeNotification();
      }, NOTIFICATION_SLIDE_ANIMATION_TIME_IN_MS);

      return () => clearTimeout(timerId);
    }
  }, [isNotificationClosing, removeNotification]);

  useEffect(() => {
    if(notification.isAutoClose) {
      const timerId = setTimeout(() => {
        handleCloseButtonClick();
      }, NOTIFICATION_AUTO_CLOSE_TIME_IN_MS);

      return () => clearTimeout(timerId);
    }
  }, [notification, handleCloseButtonClick]);

  return (
    <div css={theme => css`
      display: flex;
      align-items: center;
      column-gap: ${theme.spacing[4]};
      padding: ${theme.spacing[3]};
      ${theme.borderRound.normal}
      box-shadow: 3px 3px 5px 1px ${theme.bgColor[5]};
      animation: ${notificationSlideDownAnimation} ${NOTIFICATION_SLIDE_ANIMATION_TIME_IN_MS}ms ease-in;
      transition: all ${NOTIFICATION_SLIDE_ANIMATION_TIME_IN_MS}ms ease-in;
      ${isNotificationClosing && css`
        transform: translateY(-100%);
        opacity: 0;
      `}
      p {
        ${theme.textSize.sm}
      }
    `}>
      <div css={theme => css`
        ${theme.borderRound.normal};
        padding: ${theme.spacing[1]};
        background-color: ${theme[notification.type + "Color"][3]};
        display: flex;
        justify-content: center;
        align-items: center;
      `}>
        <NotificationIcon
          type={notification.type} size={20}
          css={theme => css`color: ${theme.textColor[1]}`}
        />
      </div>
      <p>{notification.content}</p>
      <DefaultButton onClick={handleCloseButtonClick} css={theme => css`
        ${theme.borderRound.full}
        display: flex;
        justify-content: center;
        align-items: center;
      `}>
        <IoCloseSharp size={16} />
      </DefaultButton>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(NOTIFICATION_TYPE)).isRequired,
    isAutoClose: PropTypes.bool.isRequired
  }).isRequired
};

export default memo(Notification);
