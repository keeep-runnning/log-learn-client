import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

type EmailSettingFormProps = {
  defaultEmail: string;
};

export default function EmailSettingForm({
  defaultEmail,
}: EmailSettingFormProps) {
  return (
    <Box as="form">
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel width={{ md: "25%" }} htmlFor="email">
            이메일
          </FormLabel>
          <Input
            width={{ md: "75%" }}
            isDisabled
            id="email"
            type="email"
            defaultValue={defaultEmail}
          />
        </Flex>
      </FormControl>
    </Box>
  );
}
