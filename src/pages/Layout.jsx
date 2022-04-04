import { Outlet } from "react-router-dom";

import HeaderBar from "../components/headerBar/HeaderBar";

const Layout = () => {
  return (
    <>
      <HeaderBar />
      <Outlet />
    </>
  );
};

export default Layout;
