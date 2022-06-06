import { Link } from "react-router-dom";
import { css } from "@emotion/react";

import Button from "../common/buttons/Button";
import pageUrl from "../../utils/pageUrl";

const AppIntroduction = () => {
  return (
    <section
      css={theme => css`
        ${theme.borderRound.normal};
        background-color: ${theme.primaryColor[3]};
        color: ${theme.textColor[1]};
        padding: ${theme.spacing[4]};
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: ${theme.spacing[4]};
        ${theme.mq.md} {
          background-color: ${theme.bgColor[1]};
          color: ${theme.textColor[5]};
        }
    `}>
      <p css={theme => css`
        ${theme.textSize.lg}
        ${theme.mq.md} {
          font-weight: ${theme.textWeight.bold};  
        }
      `}>
        쉽고 간단한 블로그 서비스, log learn 을 이용해 학습한 내용을 정리해 보세요
      </p>
      <Button as={Link} to={pageUrl.getSignUpPageUrl()}
        css={theme => css`
          background-color: ${theme.primaryColor[4]};
          color: ${theme.textColor[1]};
          transition: transform 150ms ease-in-out;
          &:hover {
            transform: scale(1.05);
          }
          ${theme.mq.md} {
            font-weight: ${theme.textWeight.bold};
            background-color: ${theme.primaryColor[1]};
            color: ${theme.primaryColor[3]};
            border: ${theme.lineThickness[1]} solid ${theme.primaryColor[3]};
          }
      `}>
        시작하기
      </Button>
    </section>
  );
};

export default AppIntroduction;
