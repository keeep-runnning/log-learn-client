import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "../utils/apiClient";

async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}
