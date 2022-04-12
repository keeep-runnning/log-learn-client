import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import SignUpForm from "../components/user/SignUpForm";
import AccountFormHeader from "../components/user/AccountFormHeader";

const SignUpFormMessage = styled.p`
  text-align: center;
  ${({theme}) => css`
    color: ${theme.textColor[4]};
    ${theme.textSize.sm}
    & strong {
      color: ${theme.primaryColor[3]};
    }
    & a {
      &:hover {
        font-weight: ${theme.textWeight.bold};
        color: ${theme.textColor[5]};
      }
    }
  `}
`;

const SignUp = () => {
  return (
    <section css={theme => css`
      width: 320px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      row-gap: ${theme.spacing[8]};
    `}>
      <AccountFormHeader title="계정 만들기" />
      <SignUpForm />
      <SignUpFormMessage>
        가입시, log learn 의 <strong>이용약관</strong>에 동의합니다.
      </SignUpFormMessage>
      <SignUpFormMessage>
        이미 계정이 있으신가요? <Link to="/login">로그인 하기 ></Link>
      </SignUpFormMessage>
    </section>
  );
};

export default SignUp;
