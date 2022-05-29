import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

import useCurrentUserQuery from "../hooks/queries/auth/useCurrentUserQuery";

const Settings = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useCurrentUserQuery();

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div css={theme => css`
      padding: ${theme.spacing[4]};
      ${theme.mq.md} {
        max-width: ${theme.bp.md};
        margin: 0 auto;
      }
    `}>
      <h1 css={theme => css`
        font-weight: ${theme.textWeight.bold};
        ${theme.textSize["2xl"]}
      `}>
        설정
      </h1>
    </div>
  );
};

export default Settings;
