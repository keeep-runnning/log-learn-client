import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

const appKeywords = [
  {
    keyword: "Simple",
    textGradientCss: css`
      background: linear-gradient(90deg, rgba(237,255,0,1) 33%, rgba(255,154,0,1) 66%);
      background-clip: text;
    `
  },
  {
    keyword: "Blog Service",
    textGradientCss: css`
      background: linear-gradient(90deg, rgba(0,255,171,1) 33%, rgba(0,112,255,1) 66%);
      background-clip: text;
    `
  },
  {
    keyword: "For Developers",
    textGradientCss: css`
      background: linear-gradient(90deg, rgba(237,96,213,1) 33%, rgba(99,102,241,1) 66%);
      background-clip: text;
    `
  }
];
const NUM_OF_KEYWORD = appKeywords.length;
const ACTIVE_TIME_IN_SECOND = 4;
const ACTIVE_TIME_IN_PERCENT = 100 / NUM_OF_KEYWORD;

const activateKeyword = keyframes`
  0%, ${ACTIVE_TIME_IN_PERCENT}%, 100% {
    color: black;
  }
  ${ACTIVE_TIME_IN_PERCENT / 10}%, ${ACTIVE_TIME_IN_PERCENT - (ACTIVE_TIME_IN_PERCENT / 10)}% {
    color: transparent;
  }
`;

const AppKeyword = styled.span`
  animation-name: ${activateKeyword};
  animation-duration: ${NUM_OF_KEYWORD * ACTIVE_TIME_IN_SECOND}s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-delay: ${({order}) => parseInt(order) * ACTIVE_TIME_IN_SECOND}s;
`;

const AppKeywords = () => {
  return (
    <section
      css={theme => css`
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 40px;
        padding-bottom: 40px;
        row-gap: 40px;
        font-size: 40px;
        line-height: 60px;
        color: black;
        font-weight: ${theme.textWeight.bold};
        
        ${theme.mq.md} {
          padding-top: 56px;
          padding-bottom: 56px;
          row-gap: 56px;
          font-size: 56px;
          line-height: 80px;
        }
      `}>
      {appKeywords.map(({ keyword, textGradientCss }, idx) =>
        (<AppKeyword key={idx} order={idx} css={textGradientCss}>{keyword}</AppKeyword>)
      )}
    </section>
  );
};

export default AppKeywords;
