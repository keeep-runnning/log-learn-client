import { Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserBlog from "./pages/UserBlog";
import PostPublication from "./pages/PostPublication";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import Setting from "./pages/setting/Setting";
import PostList from "./components/post/PostList";
import UserIntroductionViewer from "./components/user/UserIntroductionViewer";
import MainSettingTab from "./pages/setting/MainSettingTab";
import PasswordSettingForm from "./components/setting/PasswordSettingForm";
import AuthChecker from "./pages/AuthChecker";
import { pageKeyword } from "./utils/page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={`${pageKeyword.signUp}`} element={<SignUp />} />
        <Route path={`${pageKeyword.login}`} element={<Login />} />
        <Route path={`${pageKeyword.blogs}/:username`} element={<UserBlog />}>
          <Route index element={<PostList />} />
          <Route path={`${pageKeyword.introduction}`} element={<UserIntroductionViewer />} />
        </Route>
        <Route path={`${pageKeyword.posts}/:postId`} element={<PostDetail />} />
        <Route
          path={`${pageKeyword.settings}`}
          element={
            <AuthChecker>
              <Setting />
            </AuthChecker>
          }
        >
          <Route index element={<MainSettingTab />} />
          <Route path={`${pageKeyword.password}`} element={<PasswordSettingForm />} />
        </Route>
      </Route>
      <Route
        path={`/${pageKeyword.posts}/${pageKeyword.new}`}
        element={
          <AuthChecker>
            <PostPublication />
          </AuthChecker>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
