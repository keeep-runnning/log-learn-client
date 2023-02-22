import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import HeaderBar from "../components/header-bar/HeaderBar";
import BaseContainer from "./BaseContainer";

export default function Root() {
  return (
    <Flex direction="column" rowGap={4} pb={10}>
      <BaseContainer>
        <HeaderBar />
      </BaseContainer>
      <Outlet />
    </Flex>
  );
}
