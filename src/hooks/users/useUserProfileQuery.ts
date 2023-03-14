import { useQuery } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../../utils/apiClient";
import queryKeys from "../../utils/queryKeys";
import { UserProfile } from "../../types/users";

type LoadUserProfileResponse = {
  username: string;
  shortIntroduction: string;
  introduction: string;
};

type Loaded = {
  status: "loaded";
  userProfile: UserProfile;
};

type NotFound = {
  status: "notFound";
};

async function loadUserProfile(username: string): Promise<Loaded | NotFound> {
  try {
    const { data } = await apiClient.get<LoadUserProfileResponse>(
      `/users/${username}`
    );
    return {
      status: "loaded",
      userProfile: data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 404: {
          return {
            status: "notFound",
          };
        }
      }
    }
    throw error;
  }
}

export default function useUserProfileQuery(username: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(username),
    queryFn: () => loadUserProfile(username),
  });
}
