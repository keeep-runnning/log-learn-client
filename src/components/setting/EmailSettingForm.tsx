import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function EmailSettingForm() {
  return (
    <Box as="form">
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width={{ md: "25%" }} htmlFor="email">
            이메일
          </FormLabel>
          <Input width={{ md: "75%" }} isDisabled id="email" type="email" />
        </Flex>
      </FormControl>
    </Box>
  );
}
