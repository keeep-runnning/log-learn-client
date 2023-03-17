import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, {
  ApiFieldError,
  ApiResponseError,
} from "../../lib/apiClient";
import queryKeys from "../../utils/queryKeys";

type SetUsernameResponse = {
  username: string;
};

type Submitted = {
  status: "submitted";
} & SetUsernameResponse;

type Unauthenticated = {
  status: "unauthenticated";
  message: string;
};

type UsernameExists = {
  status: "usernameExists";
  message: string;
};

type FieldsInvalid = {
  status: "fieldsInvalid";
  fieldErrors: ApiFieldError[];
};

async function setUsername(
  username: string
): Promise<Submitted | Unauthenticated | UsernameExists | FieldsInvalid> {
  try {
    const { data } = await apiClient.put<SetUsernameResponse>(
      "/auth/me/username",
      {
        username,
      }
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
        case 409: {
          return {
            status: "usernameExists",
            message: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function useUsernameSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setUsername,
    onSuccess: (usernameSettingResult) => {
      if (usernameSettingResult.status === "submitted") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.me,
        });
      }
    },
  });
}
