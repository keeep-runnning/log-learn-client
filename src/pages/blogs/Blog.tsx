import { useParams, Outlet, useOutletContext } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import { pagePath } from "../../utils/page";
import UserProfileCard from "../../components/users/UserProfileCard";
import NavLinkTabs from "../../components/NavLinkTabs";
import useUserProfileQuery from "../../hooks/users/useUserProfileQuery";
import NotFound from "../NotFound";
import LoadingMessage from "../../components/LoadingMessage";
import BaseContainer from "../BaseContainer";
import { UserProfile } from "../../types/users";

export function useBlogOwner() {
  return useOutletContext<{ blogOwner: UserProfile }>();
}

export default function Blog() {
  const params = useParams();
  const usernameParam: string = params.username!;

  const userProfileQuery = useUserProfileQuery(usernameParam);

  if (userProfileQuery.data) {
    if (userProfileQuery.data.status === "notFound") {
      return <NotFound />;
    }

    const blogOwner: UserProfile = userProfileQuery.data.userProfile;

    return (
      <Flex direction="column" rowGap={8}>
        <BaseContainer>
          <UserProfileCard userProfile={blogOwner} />
        </BaseContainer>
        <BaseContainer>
          <NavLinkTabs
            tabs={[
              { name: "포스트", link: pagePath.getBlog(blogOwner.username) },
              { name: "소개", link: pagePath.getBlogOwnerIntroduction(blogOwner.username) },
            ]}
          />
        </BaseContainer>
        <Outlet context={{ blogOwner }} />
      </Flex>
    );
  }

  return (
    <BaseContainer>
      <LoadingMessage />
    </BaseContainer>
  );
}
