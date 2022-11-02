import { css } from "@emotion/react";
import { Link } from "react-router-dom";

import Logo from "../components/common/Logo";
import PrimaryButton from "../components/common/buttons/PrimaryButton";

const NotFound = () => {
  return (
    <div
      css={(theme) => css`
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: ${theme.bgColor[2]};
      `}
    >
      <div
        css={(theme) => css`
          padding: ${theme.spacing[8]};
          max-width: ${theme.bp.md};
          margin: 96px auto 0;
          display: flex;
          flex-direction: column;
          row-gap: 96px;
        `}
      >
        <header
          css={(theme) => css`
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: ${theme.spacing[8]};
          `}
        >
          <Link to="/">
            <Logo />
          </Link>
          <span
            css={(theme) => css`
              font-size: 48px;
              font-weight: ${theme.textWeight.bold};
              color: ${theme.primaryColor[3]};
            `}
          >
            404
          </span>
        </header>
        <section
          css={(theme) => css`
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: ${theme.spacing[8]};
          `}
        >
          <h1
            css={(theme) => css`
              font-weight: ${theme.textWeight.bold};
              ${theme.textSize["2xl"]}
            `}
          >
            페이지를 찾지 못했습니다.
          </h1>
          <p
            css={(theme) => css`
              ${theme.textSize.lg}
            `}
          >
            잘못된 주소이거나, 더 이상 제공하지 않는 페이지입니다.
          </p>
          <PrimaryButton as={Link} to="/">
            메인 페이지로 이동
          </PrimaryButton>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
