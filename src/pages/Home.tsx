import { Flex, Text } from "@chakra-ui/react";

import SparklingKeyword from "../components/SparklingKeyword";
import BaseContainer from "../components/BaseContainer";

const keywords = [
  {
    keyword: "Simple",
    backgroundGradient: "linear-gradient(90deg, rgba(254,183,0,1) 10%, rgba(219,235,14,1) 90%)",
  },
  {
    keyword: "Blog Service",
    backgroundGradient: "linear-gradient(90deg, rgba(0,254,132,1) 10%, rgba(14,70,235,1) 90%)",
  },
  {
    keyword: "For Developers",
    backgroundGradient: "linear-gradient(90deg, rgba(55,0,254,1) 10%, rgba(233,14,235,1) 90%)",
  },
];

export default function Home() {
  return (
    <BaseContainer>
      <Flex direction="column" rowGap={{ base: 12, md: 16 }} pt={{ base: 16, md: 20 }}>
        <Flex direction="column" rowGap={{ base: 4, md: 6 }} alignItems="center">
          {keywords.map(({ keyword, backgroundGradient }, index) => (
            <SparklingKeyword
              key={index}
              keyword={keyword}
              backgroundGradient={backgroundGradient}
              index={index}
              numberOfKeywords={keywords.length}
            />
          ))}
        </Flex>
        <Flex
          direction="column"
          fontSize={{ base: "lg", md: "2xl" }}
          textAlign="center"
          rowGap={{ md: 2 }}
        >
          <Text>쉽고 간단한 블로그 서비스,</Text>
          <Text>
            <Text as="strong" color="main.500" fontWeight="bold">
              log learn
            </Text>
            을 이용해 학습한 내용을 정리하세요
          </Text>
        </Flex>
      </Flex>
    </BaseContainer>
  );
}
