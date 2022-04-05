import { css, Global } from "@emotion/react";

import colorPalette from "./colorPalette";

const GlobalStyles = () => {
  return (
    <Global styles={css`
      * {
        margin: 0;
        padding: 0;
        font: inherit;
        color: inherit;
      }
      a {
        text-decoration: none;
      }
      button {
        background: none;
        border: 0;
        cursor: pointer;
      }
      ol, ul {
        list-style: none;
      }
      html {
        color: ${colorPalette.gray9};
      }
    `} />
  );
};

export default GlobalStyles;
