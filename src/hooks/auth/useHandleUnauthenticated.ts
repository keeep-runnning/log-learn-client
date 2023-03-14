import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { pagePath } from "../../utils/page";
import queryKeys from "../../utils/queryKeys";
import { LoggedOutMe } from "../../types/auth";

export default function useHandleUnauthenticated() {
  const toast = useToast();

  const navigate = useNavigate();

  const location = useLocation();

  const queryClient = useQueryClient();

  return () => {
    queryClient.setQueryData<LoggedOutMe>(queryKeys.me, {
      status: "loggedOut",
    });

    navigate(pagePath.getLogin(), {
      replace: true,
      state: { from: location },
    });

    toast({
      title: "로그인 만료",
      description: "로그인이 만료되었습니다. 다시 로그인해주세요",
      status: "error",
      position: "top",
      isClosable: true,
    });
  };
}
