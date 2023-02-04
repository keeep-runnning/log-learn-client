import { Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import PostPublication from "./pages/PostPublication";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import Setting from "./pages/setting/Setting";
import PostList from "./components/post/PostList";
import UserIntroductionViewer from "./components/user/UserIntroductionViewer";
import MainSettingTab from "./pages/setting/MainSettingTab";
import PasswordSettingForm from "./components/setting/PasswordSettingForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="users/:username" element={<UserHome />}>
          <Route index element={<PostList />} />
          <Route path="introduction" element={<UserIntroductionViewer />} />
        </Route>
        <Route path="posts/:postId" element={<PostDetail />} />
        <Route path="settings" element={<Setting />}>
          <Route index element={<MainSettingTab />} />
          <Route path="password" element={<PasswordSettingForm />} />
        </Route>
      </Route>
      <Route path="/posts/new" element={<PostPublication />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
