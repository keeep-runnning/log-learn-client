import ReactDOM from "react-dom";
import Notifications from "./Notifications";

const GlobalNotifications = () => {
  return ReactDOM.createPortal(<Notifications />, document.getElementById("notifications"));
};

export default GlobalNotifications;
