import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../../lib/apiClient";
import queryKeys from "../../utils/queryKeys";

type SetIntroductionResponse = {
  introduction: string;
};

type Submitted = {
  status: "submitted";
} & SetIntroductionResponse;

type Unauthenticated = {
  status: "unauthenticated";
  message: string;
};

async function setIntroduction(
  introduction: string
): Promise<Submitted | Unauthenticated> {
  try {
    const { data } = await apiClient.put<SetIntroductionResponse>(
      "/auth/me/introduction",
      {
        introduction,
      }
    );
    return {
      status: "submitted",
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 401: {
          return {
            status: "unauthenticated",
            message: error.message,
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
      if (introductionSettingResult.status === "submitted") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.me,
        });
      }
    },
  });
}
