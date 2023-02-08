import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, { ApiFieldError, ApiResponseError } from "../utils/apiClient";

type SetShortIntroductionResponse = {
  shortIntroduction: string;
};

type Submitted = {
  result: "submitted";
} & SetShortIntroductionResponse;

type Unauthenticated = {
  result: "unauthenticated";
  reason: string;
};

type FieldInvalid = {
  result: "fieldInvalid";
  fieldErrors: ApiFieldError[];
};

type SetShortIntroductionResult = Submitted | Unauthenticated | FieldInvalid;

async function setShortIntroduction(
  shortIntroduction: string
): Promise<SetShortIntroductionResult> {
  try {
    const { data } = await apiClient.put<SetShortIntroductionResponse>(
      "/auth/settings/short-introduction",
      { shortIntroduction }
    );
    return {
      result: "submitted",
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            result: "fieldInvalid",
            fieldErrors: error.fieldErrors,
          };
        }
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

export default function useShortIntroductionSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setShortIntroduction,
    onSuccess: (shortIntroductionSettingResult) => {
      if (shortIntroductionSettingResult.result === "submitted") {
        queryClient.invalidateQueries({
          queryKey: ["setting"],
        });
      } else if (shortIntroductionSettingResult.result === "unauthenticated") {
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
    },
  });
}
