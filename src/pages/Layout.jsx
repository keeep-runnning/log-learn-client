import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import HeaderBar from "../components/common/HeaderBar";

export default function Layout() {
  return (
    <Flex direction="column">
      <HeaderBar />
      <Outlet />
    </Flex>
  );
}
