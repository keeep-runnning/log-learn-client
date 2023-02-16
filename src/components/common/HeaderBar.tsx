import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";

export default function HeaderBar() {
  return (
    <Flex as="header" h={20} alignItems="center" justifyContent="space-between">
      <Link to="/">
        <Logo />
      </Link>
      <HeaderMenu />
    </Flex>
  );
}
