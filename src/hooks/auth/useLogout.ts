import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "../../lib/apiClient";
import queryKeys from "../../utils/queryKeys";
import { LoggedOutMe } from "../../types/auth";

async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData<LoggedOutMe>(queryKeys.me, {
        status: "loggedOut",
      });
    },
  });
}
