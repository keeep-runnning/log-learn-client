import { css } from "@emotion/react";

import AppKeywords from "../components/home/AppKeywords";
import AppIntroduction from "../components/home/AppIntroduction";

const Home = () => {
  return (
    <div
      css={theme => css`
        padding: ${theme.spacing[4]};
        & > * + * {
          margin-top: ${theme.spacing[4]};
        }
        ${theme.mq.md} {
          & > * + * {
            margin-top: ${theme.spacing[8]};
          }
        }
    `}>
      <AppKeywords />
      <AppIntroduction />
    </div>
  );
};

export default Home;
