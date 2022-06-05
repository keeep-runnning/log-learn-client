import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { notificationType } from "../components/common/notifications/Notification";

const useNotificationsWithRedirect = () => {
  const navigate = useNavigate();

  const redirectThenNotify = useCallback(
    ({ notificationType, content, isAutoClose = true, to, replace = false , state }) => {
      navigate(to, {
        replace,
        state: {
          ...state,
          notification: {
            type: notificationType,
            content,
            isAutoClose
          }
        }
      });
    },
    []
  );

  const redirectThenNotifyInfo = useCallback(
    ({ content, isAutoClose = true, to, replace = false, state }) => {
      redirectThenNotify({
        notificationType: notificationType.INFO,
        content,
        isAutoClose,
        to,
        replace,
        state
      });
    },
    []
  );

  const redirectThenNotifySuccess = useCallback(
    ({ content, isAutoClose = true, to, replace = false, state }) => {
      redirectThenNotify({
        notificationType: notificationType.SUCCESS,
        content,
        isAutoClose,
        to,
        replace,
        state
      });
    },
    []
  );

  const redirectThenNotifyWarning = useCallback(
    ({ content, isAutoClose = true, to, replace = false, state }) => {
      redirectThenNotify({
        notificationType: notificationType.WARNING,
        content,
        isAutoClose,
        to,
        replace,
        state
      });
    },
    []
  );

  const redirectThenNotifyDanger = useCallback(
    ({ content, isAutoClose = true, to, replace = false, state }) => {
      redirectThenNotify({
        notificationType: notificationType.DANGER,
        content,
        isAutoClose,
        to,
        replace,
        state
      });
    },
    []
  );

  return ({
    redirectThenNotifyInfo,
    redirectThenNotifySuccess,
    redirectThenNotifyWarning,
    redirectThenNotifyDanger
  });
};

export default useNotificationsWithRedirect;
