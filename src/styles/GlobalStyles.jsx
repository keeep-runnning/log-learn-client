import { css, Global } from "@emotion/react";

const GlobalStyles = () => {
  return (
    <Global styles={css`
      a {
        text-decoration: none;
        color: inherit;
      }
      button {
        padding: 0;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
      ol, ul, li {
        margin: 0;
        padding: 0;
        border: 0;
      }
      ol, ul {
        list-style: none;
      }
    `} />
  );
};

export default GlobalStyles;
