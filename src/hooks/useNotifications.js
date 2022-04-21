import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { nanoid } from "nanoid";

import { notificationsState } from "../recoil/notificationsState";

const useNotifications = () => {
  const setNotifications = useSetRecoilState(notificationsState);

  const addNotification = useCallback(({ content, type, isAutoClose = true }) => {
    const newNotification = { content, type, isAutoClose, id: nanoid() };
    setNotifications(notifications => [...notifications, newNotification]);
  }, []);

  return ({ addNotification });
};

export default useNotifications;
