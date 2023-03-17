import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, {
  ApiFieldError,
  ApiResponseError,
} from "../../lib/apiClient";
import queryKeys from "../../utils/queryKeys";

type SetShortIntroductionResponse = {
  shortIntroduction: string;
};

type Submitted = {
  status: "submitted";
} & SetShortIntroductionResponse;

type Unauthenticated = {
  status: "unauthenticated";
  message: string;
};

type FieldsInvalid = {
  status: "fieldsInvalid";
  fieldErrors: ApiFieldError[];
};

async function setShortIntroduction(
  shortIntroduction: string
): Promise<Submitted | Unauthenticated | FieldsInvalid> {
  try {
    const { data } = await apiClient.put<SetShortIntroductionResponse>(
      "/auth/me/short-introduction",
      { shortIntroduction }
    );
    return {
      status: "submitted",
      ...data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            status: "fieldsInvalid",
            fieldErrors: error.fieldErrors,
          };
        }
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

export default function useShortIntroductionSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setShortIntroduction,
    onSuccess: (shortIntroductionSettingResult) => {
      if (shortIntroductionSettingResult.status === "submitted") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.me,
        });
      }
    },
  });
}
