import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import pageUrl from "../utils/pageUrl";

export default function useHandleUnauthenticatedError() {
  const toast = useToast();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: ["me"],
    });
    navigate(pageUrl.getLoginPageUrl(), { replace: true });
    toast({
      title: "로그인 만료",
      description: "로그인이 만료되었습니다. 다시 로그인해주세요",
      status: "error",
      position: "top",
      isClosable: true,
    });
  };
}
