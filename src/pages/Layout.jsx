import { Outlet } from "react-router-dom";

import HeaderBar from "../components/common/HeaderBar";

const Layout = () => {
  return (
    <>
      <HeaderBar />
      <Outlet />
    </>
  );
};

export default Layout;
