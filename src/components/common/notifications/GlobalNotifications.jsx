import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

import Notifications from "./Notifications";
import useNotifications from "../../../hooks/useNotifications";

const GlobalNotifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notify, clearNotifications } = useNotifications();

  useEffect(() => {
    const { state, pathname, search } = location;
    const notification = state?.notification;
    if (notification) {
      notify(notification);
      navigate(pathname + search, { replace: true });
      return;
    }

    return clearNotifications;
  }, [location]);

  return createPortal(<Notifications />, document.getElementById("notifications"));
};

export default GlobalNotifications;
