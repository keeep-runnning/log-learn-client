import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function NavLinkTabs({ navLinks = [] }) {
  return (
    <Box as="nav">
      <Flex
        as="ul"
        direction={{ base: "column", md: "row" }}
        justifyContent={{ md: "center" }}
        gap={{ base: 2, md: 4 }}
      >
        {navLinks.map(({ name, link }) => (
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

NavLinkTabs.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};
