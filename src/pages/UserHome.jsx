import { useParams, Outlet } from "react-router-dom";
import useUserQuery from "../hooks/queries/users/useUserQuery";
import NotFound from "./NotFound";
import UserProfileCard from "../components/user/UserProfileCard";
import UserHomeMenuTabs from "../components/user/UserHomeMenuTabs";
import { Container, Flex, Spinner } from "@chakra-ui/react";

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
        <Flex direction="column" alignItems={{ sm: "center" }}>
          <UserHomeMenuTabs username={userData.username} />
        </Flex>
        <Outlet context={{ userData }} />
      </Flex>
    </Container>
  );
}
