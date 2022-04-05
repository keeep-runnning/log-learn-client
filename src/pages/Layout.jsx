import { Outlet } from "react-router-dom";

import HeaderBar from "../components/HeaderBar";

const Layout = () => {
  return (
    <>
      <HeaderBar />
      <Outlet />
    </>
  );
};

export default Layout;
