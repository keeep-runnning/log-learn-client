import { css } from "@emotion/react";

const Logo = () => {
  return (
    <div
      css={(theme) => css`
        display: flex;
        align-items: center;
        column-gap: ${theme.spacing[3]};
      `}
    >
      <img src="/logo.png" alt="logo" width={28} />
      <h1
        css={(theme) => css`
          ${theme.textSize.xl}
          font-weight: ${theme.textWeight.bold};
        `}
      >
        log learn
      </h1>
    </div>
  );
};

export default Logo;
