import { Route, Routes } from "react-router-dom";

import useCurrentUserQuery from "./hooks/queries/auth/useCurrentUserQuery";
import AuthChecker from "./components/router/AuthChecker";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import PostPublication from "./pages/PostPublication";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

const App = () => {
  const { isLoggedIn } = useCurrentUserQuery();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route
          path="settings"
          element={
            <AuthChecker isLoggedIn={isLoggedIn}>
              <Settings />
            </AuthChecker>
          }
        />
      </Route>
      <Route path="/@:username" element={<Layout />}>
        <Route index element={<UserHome />} />
        <Route path="posts/:postId" element={<PostDetail />} />
      </Route>
      <Route
        path="/write"
        element={
          <AuthChecker isLoggedIn={isLoggedIn}>
            <PostPublication />
          </AuthChecker>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
