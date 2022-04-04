import { css } from "@emotion/react";

import breakpoints from "./breakpoints";
import colorPalette from "./colorPalette";

const defaultValues = {
  spacing: {
    0: "0px",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem"
  },
  lineThickness: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px"
  },
  textSize: {
    xs: css`
      font-size: 0.75rem;
      line-height: 1rem;
    `,
    sm: css`
      font-size: 0.875rem;
      line-height: 1.25rem;
    `,
    base: css`
      font-size: 1rem;
      line-height: 1.5rem;
    `,
    lg: css`
      font-size: 1.125rem;
      line-height: 1.75rem;
    `,
    xl: css`
      font-size: 1.25rem;
      line-height: 1.75rem;
    `,
    "2xl": css`
      font-size: 1.5rem;
      line-height: 2rem;
    `,
  },
  textWeight: {
    normal: "400",
    bold: "700"
  },
  borderRound: {
    normal: css`
      border-radius: 0.25rem;
    `,
    full: css`
      border-radius: 9999px;
    `
  },
  bp: {
    md: breakpoints.md,
    lg: breakpoints.lg
  },
  mq: {
    md: `@media(min-width: ${breakpoints.md})`,
    lg: `@media(min-width: ${breakpoints.lg})`
  }
};

export const theme = {
  ...defaultValues,
  primaryColor: {
    1: colorPalette.indigo1,
    2: colorPalette.indigo3,
    3: colorPalette.indigo5,
    4: colorPalette.indigo7,
    5: colorPalette.indigo9
  },
  successColor: {
    1: colorPalette.green1,
    2: colorPalette.green3,
    3: colorPalette.green5,
    4: colorPalette.green7,
    5: colorPalette.green9
  },
  infoColor: {
    1: colorPalette.blue1,
    2: colorPalette.blue3,
    3: colorPalette.blue5,
    4: colorPalette.blue7,
    5: colorPalette.blue9
  },
  warningColor: {
    1: colorPalette.yellow1,
    2: colorPalette.yellow3,
    3: colorPalette.yellow5,
    4: colorPalette.yellow7,
    5: colorPalette.yellow9
  },
  dangerColor: {
    1: colorPalette.red1,
    2: colorPalette.red3,
    3: colorPalette.red5,
    4: colorPalette.red7,
    5: colorPalette.red9
  },
  textColor: {
    1: colorPalette.white,
    2: colorPalette.gray4,
    3: colorPalette.gray5,
    4: colorPalette.gray6,
    5: colorPalette.gray9
  },
  lineColor: {
    1: colorPalette.gray1,
    2: colorPalette.gray4,
    3: colorPalette.gray5,
    4: colorPalette.gray6,
    5: colorPalette.gray9
  },
  bgColor: {
    1: colorPalette.white,
    2: colorPalette.gray1,
    3: colorPalette.gray2,
    4: colorPalette.gray3,
    5: colorPalette.gray4
  }
};
