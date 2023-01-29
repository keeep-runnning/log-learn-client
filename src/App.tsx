import { Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import PostPublication from "./pages/PostPublication";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import PostList from "./components/post/PostList";
import UserIntroductionViewer from "./components/user/UserIntroductionViewer";
import MainSettingsForms from "./components/settings/MainSettingsForms";
import PasswordSettingsForm from "./components/settings/PasswordSettingsForm";
import IntroductionSettingsForm from "./components/settings/IntroductionSettingsForm";

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
        <Route path="settings" element={<Settings />}>
          <Route index element={<MainSettingsForms />} />
          <Route path="password" element={<PasswordSettingsForm />} />
          <Route path="introduction" element={<IntroductionSettingsForm />} />
        </Route>
      </Route>
      <Route path="/posts/new" element={<PostPublication />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
