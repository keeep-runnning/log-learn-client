import { useCallback, useState } from "react";

const useAlertMessage = (initialValue = "") => {
  const [alertMessage, setAlertMessage] = useState(initialValue);

  const removeAlertMessage = useCallback(() => {
    setAlertMessage("");
  }, []);

  return { alertMessage, setAlertMessage, removeAlertMessage };
};

export default useAlertMessage;
