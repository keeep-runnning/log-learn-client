import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import HeaderBar from "../components/header-bar/HeaderBar";
import BaseContainer from "../components/BaseContainer";

export default function RootLayout() {
  return (
    <Flex direction="column" rowGap={4} pb={10}>
      <BaseContainer>
        <HeaderBar />
      </BaseContainer>
      <Outlet />
    </Flex>
  );
}
