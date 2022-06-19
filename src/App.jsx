import { Route, Routes } from "react-router-dom";

import useCurrentUserQuery from "./hooks/queries/auth/useCurrentUserQuery";
import AuthChecker from "./components/router/AuthChecker";
import GlobalNotifications from "./components/common/notifications/GlobalNotifications";
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

const App = () => {
  const { isLoggedIn } = useCurrentUserQuery();

  return (
    <>
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
          <Route
            path="settings"
            element={
              <AuthChecker isLoggedIn={isLoggedIn}>
                <Settings />
              </AuthChecker>
            }
          >
            <Route index element={<MainSettingsForms />} />
            <Route path="password" element={<PasswordSettingsForm />} />
            <Route path="introduction" element={<IntroductionSettingsForm />} />
          </Route>
        </Route>
        <Route
          path="/posts/new"
          element={
            <AuthChecker isLoggedIn={isLoggedIn}>
              <PostPublication />
            </AuthChecker>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GlobalNotifications />
    </>
  );
};

export default App;
