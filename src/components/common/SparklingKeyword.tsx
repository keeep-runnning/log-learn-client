import { css, keyframes } from "@emotion/react";
import { Text } from "@chakra-ui/react";

const SPARKLING_DURATION_IN_SECOND = 4;
const SPARKLING_TRANSITION_PERCENT = 20;

type SparklingKeywordProps = {
  keyword: string;
  backgroundGradient: string;
  index: number;
  numberOfKeywords: number;
};

export default function SparklingKeyword({
  keyword,
  backgroundGradient,
  index,
  numberOfKeywords,
}: SparklingKeywordProps) {
  const defaultColor = "black";
  const transparent = "transparent";

  const sparklingEndPercent = 100 / numberOfKeywords;
  const durationInSecond = numberOfKeywords * SPARKLING_DURATION_IN_SECOND;
  const firstDelayInSecond = index * SPARKLING_DURATION_IN_SECOND;

  return (
    <Text
      bgGradient={backgroundGradient}
      bgClip="text"
      fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl", xl: "8xl" }}
      fontWeight="extrabold"
      textAlign="center"
    >
      <span
        css={css`
          color: ${defaultColor};
          animation-name: ${keyframes`
          0%, ${sparklingEndPercent}%, 100% {
            color: ${defaultColor};
          }
          ${(sparklingEndPercent * SPARKLING_TRANSITION_PERCENT) / 100}%, ${
            (sparklingEndPercent * (100 - SPARKLING_TRANSITION_PERCENT)) / 100
          }% {
            color: ${transparent};
          }
        `};
          animation-duration: ${durationInSecond}s;
          animation-delay: ${firstDelayInSecond}s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in;
        `}
      >
        {keyword}
      </span>
    </Text>
  );
}
