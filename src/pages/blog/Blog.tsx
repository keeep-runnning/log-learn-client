import { useParams, Outlet, useOutletContext } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";

import { pagePath } from "../../utils/page";
import UserProfileCard from "../../components/user/UserProfileCard";
import NavLinkTabs from "../../components/common/NavLinkTabs";
import useUserInfoQuery from "../../hooks/useUserInfoQuery";
import NotFound from "../NotFound";
import LoadingMessage from "../../components/common/LoadingMessage";

type BlogOwner = {
  username: string;
  shortIntroduction: string;
  introduction: string;
};

export function useBlogOwner() {
  return useOutletContext<{ blogOwner: BlogOwner }>();
}

export default function Blog() {
  const params = useParams();
  const usernameParam: string = params.username!;

  const userInfoQuery = useUserInfoQuery(usernameParam);

  if (userInfoQuery.data) {
    if (userInfoQuery.data.result === "notFound") {
      return <NotFound />;
    }

    const blogOwner: BlogOwner = {
      username: userInfoQuery.data.username,
      shortIntroduction: userInfoQuery.data.shortIntroduction,
      introduction: userInfoQuery.data.introduction,
    };

    return (
      <Container maxW="container.lg">
        <Flex direction="column" rowGap={8}>
          <UserProfileCard
            user={{
              username: blogOwner.username,
              shortIntroduction: blogOwner.shortIntroduction,
            }}
          />
          <NavLinkTabs
            navLinkTabs={[
              { name: "포스트", link: pagePath.getBlog(blogOwner.username) },
              { name: "소개", link: pagePath.getBlogOwnerIntroduction(blogOwner.username) },
            ]}
          />
          <Outlet context={{ blogOwner }} />
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg">
      <LoadingMessage />
    </Container>
  );
}
