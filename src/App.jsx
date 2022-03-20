import { Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/@:username" element={<Layout />}>
        <Route index element={<UserHome />}/>
      </Route>
    </Routes>
  );
};

export default App;
