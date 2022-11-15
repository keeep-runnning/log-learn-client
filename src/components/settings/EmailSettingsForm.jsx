import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function EmailSettingsForm({ data }) {
  return (
    <Box as="form">
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width={{ md: "25%" }} htmlFor="email">
            이메일
          </FormLabel>
          <Input width={{ md: "75%" }} isDisabled id="email" type="email" defaultValue={data} />
        </Flex>
      </FormControl>
    </Box>
  );
}

EmailSettingsForm.propTypes = {
  data: PropTypes.string.isRequired,
};
