import PropTypes from "prop-types";
import { Text, useTheme } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";

const SPARKLING_DURATION_IN_SECOND = 4;
const SPARKLING_TRANSITION_PERCENT = 20;

export default function SparklingKeyword({ keyword, backgroundGradient, index, numberOfKeywords }) {
  const theme = useTheme();
  const defaultColor = theme.colors.black;
  const transparent = theme.colors.transparent;

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

SparklingKeyword.propTypes = {
  keyword: PropTypes.string.isRequired,
  backgroundGradient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  numberOfKeywords: PropTypes.number.isRequired,
};
