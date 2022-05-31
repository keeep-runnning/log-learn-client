import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

import HeaderBar from "../components/common/HeaderBar";

const Layout = () => {
  return (
    <div css={css`
      height: 100vh;
      display: flex;
      flex-direction: column;
    `}>
      <HeaderBar />
      <div css={css`flex-grow: 1; `}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
