import { FormEvent, useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";

import Editor from "../common/Editor/Editor";

export default function IntroductionSettingForm() {
  const [introduction, setIntroduction] = useState("");

  const handleSubmit = (e: FormEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} direction="column" rowGap={4}>
      <FormControl as={Flex} direction={{ base: "column", md: "row" }}>
        <FormLabel width={{ md: "25%" }}>소개</FormLabel>
        <Box height="560px" flexGrow={{ md: 1 }}>
          <Editor value={introduction} onChange={setIntroduction} />
        </Box>
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
