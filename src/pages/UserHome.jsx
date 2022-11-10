import { useParams, Outlet } from "react-router-dom";
import useUserQuery from "../hooks/queries/users/useUserQuery";
import NotFound from "./NotFound";
import UserProfileCard from "../components/user/UserProfileCard";
import { Container, Flex, Spinner } from "@chakra-ui/react";
import pageUrl from "../utils/pageUrl";
import NavLinkTabs from "../components/common/NavLinkTabs";

export default function UserHome() {
  const { username } = useParams();

  const { data: userData, error, isLoading, isError } = useUserQuery(username);

  if (isLoading) {
    return <Spinner size="lg" color="main.500" />;
  }

  if (isError) {
    if (error.response?.status === 404) {
      return <NotFound />;
    }

    return null;
  }

  return (
    <Container maxW="container.lg">
      <Flex direction="column" rowGap={8}>
        <UserProfileCard userData={userData} />
        <NavLinkTabs
          navLinks={[
            { name: "포스트", link: pageUrl.getUserHomePageUrl(userData.username) },
            { name: "소개", link: pageUrl.getUserIntroductionPageUrl(userData.username) },
          ]}
        />
        <Outlet context={{ userData }} />
      </Flex>
    </Container>
  );
}
