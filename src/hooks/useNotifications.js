import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { nanoid } from "nanoid";

import { notificationsState } from "../recoil/notificationsState";
import { notificationType } from "../components/common/notifications/Notification";

const useNotifications = () => {
  const setNotifications = useSetRecoilState(notificationsState);

  const notify = useCallback(({ content, type, isAutoClose = true }) => {
    const newNotification = { content, type, isAutoClose, id: nanoid() };
    setNotifications(notifications => [...notifications, newNotification]);
  }, []);

  const notifyInfo = useCallback(({ content, isAutoClose = true }) => {
    notify({
      type: notificationType.INFO,
      content,
      isAutoClose
    });
  }, []);

  const notifySuccess = useCallback(({ content, isAutoClose = true }) => {
    notify({
      type: notificationType.SUCCESS,
      content,
      isAutoClose
    });
  }, []);

  const notifyWarning = useCallback(({ content, isAutoClose = true }) => {
    notify({
      type: notificationType.WARNING,
      content,
      isAutoClose
    });
  }, []);

  const notifyDanger = useCallback(({ content, isAutoClose = true }) => {
    notify({
      type: notificationType.DANGER,
      content,
      isAutoClose
    });
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return ({ notify, notifyInfo, notifySuccess, notifyWarning, notifyDanger, clearNotifications });
};

export default useNotifications;
