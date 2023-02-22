import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../../utils/apiClient";

type SetIntroductionResponse = {
  introduction: string;
};

type Submitted = {
  result: "submitted";
} & SetIntroductionResponse;

type Unauthenticated = {
  result: "unauthenticated";
  reason: string;
};

type SetIntroductionResult = Submitted | Unauthenticated;

async function setIntroduction(introduction: string): Promise<SetIntroductionResult> {
  try {
    const { data } = await apiClient.put<SetIntroductionResponse>("/auth/me/introduction", {
      introduction,
    });
    return {
      result: "submitted",
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 401: {
          return {
            result: "unauthenticated",
            reason: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function useIntroductionSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setIntroduction,
    onSuccess: (introductionSettingResult) => {
      if (introductionSettingResult.result === "submitted") {
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
    },
  });
}
