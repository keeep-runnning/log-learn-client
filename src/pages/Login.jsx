import { Link } from "react-router-dom";
import { css } from "@emotion/react";

import LoginForm from "../components/accountForm/LoginForm";
import AccountFormHeader from "../components/accountForm/AccountFormHeader";

const Login = () => {
  return (
    <section css={theme => css`
      width: 320px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      row-gap: ${theme.spacing[8]};
    `}>
      <AccountFormHeader title="로그인" />
      <LoginForm />
      <p css={theme => css`
        text-align: center;
        color: ${theme.textColor[4]};
        ${theme.textSize.sm}
        & a {
          &:hover {
            color: ${theme.textColor[5]};
            font-weight: ${theme.textWeight.bold};
          }
        }
      `}>
        아직 계정이 없으신가요? <Link to="/signup">계정 만들기 ></Link>
      </p>
    </section>
  );
};

export default Login;
