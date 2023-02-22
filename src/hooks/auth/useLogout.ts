import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "../../utils/apiClient";
import queryKeys from "../../utils/queryKeys";
import { LoggedOutMe } from "./useMeQuery";

async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      const loggedOutMe: LoggedOutMe = {
        isLoggedIn: false,
      };
      queryClient.setQueryData(queryKeys.me, loggedOutMe);
    },
  });
}
