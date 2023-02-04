import { Box, Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

type UsernameSettingFormProps = {
  defaultUsername: string;
};

export default function UsernameSettingForm({ defaultUsername }: UsernameSettingFormProps) {
  return (
    <Flex as="form" direction="column" rowGap={4}>
      <FormControl>
        <Flex direction={{ base: "column", md: "row" }}>
          <FormLabel htmlFor="username" width={{ md: "25%" }}>
            유저이름
          </FormLabel>
          <Box flexGrow={{ md: 1 }}>
            <Input id="username" type="text" defaultValue={defaultUsername} />
          </Box>
        </Flex>
      </FormControl>
      <Button
        type="submit"
        size="sm"
        colorScheme="main"
        loadingText="수정 중..."
        alignSelf="flex-end"
      >
        수정하기
      </Button>
    </Flex>
  );
}
