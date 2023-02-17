import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { pagePath } from "../utils/page";
import { LoggedOutMe } from "./useMeQuery";

export default function useHandleUnauthenticatedError() {
  const toast = useToast();

  const navigate = useNavigate();

  const location = useLocation();

  const queryClient = useQueryClient();

  return () => {
    const loggedOutMe: LoggedOutMe = {
      isLoggedIn: false,
    };
    queryClient.setQueryData(["me"], loggedOutMe);

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
