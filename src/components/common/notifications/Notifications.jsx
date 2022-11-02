import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";

import { notificationsState } from "../../../recoil/notificationsState";
import Notification from "./Notification";

const Notifications = () => {
  const notifications = useRecoilValue(notificationsState);

  return (
    <ul
      css={(theme) => css`
        position: fixed;
        top: ${theme.spacing[8]};
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        row-gap: ${theme.spacing[4]};
        width: 320px;
      `}
    >
      {notifications.map((notification) => (
        <li key={notification.id}>
          <Notification notification={notification} />
        </li>
      ))}
    </ul>
  );
};

export default Notifications;
