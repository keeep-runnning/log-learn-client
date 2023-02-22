import { NavLink } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";

type NavLinkTab = {
  name: string;
  link: string;
};

type NavLinksTabsProps = {
  tabs: NavLinkTab[];
};

export default function NavLinkTabs({ tabs }: NavLinksTabsProps) {
  return (
    <Box as="nav">
      <Flex
        as="ul"
        listStyleType="none"
        direction={{ base: "column", md: "row" }}
        justifyContent={{ md: "center" }}
        gap={{ base: 2, md: 4 }}
      >
        {tabs.map(({ name, link }) => (
          <Box as="li" key={link}>
            <NavLink to={link} end>
              {({ isActive }) => (
                <Text
                  textAlign="center"
                  borderRadius={{ base: "md", md: "full" }}
                  py={2}
                  px={{ base: 2, md: 4 }}
                  backgroundColor={isActive ? "main.500" : "white"}
                  color={isActive ? "white" : "black"}
                  _hover={{ backgroundColor: isActive ? "main.500" : "main.100" }}
                >
                  {name}
                </Text>
              )}
            </NavLink>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
