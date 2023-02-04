import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import httpClient from "../utils/httpClient";

async function logout(): Promise<void> {
  await httpClient.post("/auth/logout");
}

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      navigate("/");
    },
  });
}
