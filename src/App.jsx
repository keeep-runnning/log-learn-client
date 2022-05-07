import { Route, Routes } from "react-router-dom";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";

import { fetchCurrentUser } from "./apis";
import { currentUserState } from "./recoil/currentUserState";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import PostPublication from "./pages/PostPublication";
import PostDetail from "./pages/PostDetail";

const App = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);

  const { isLoading, isError, error } = useQuery("currentUser", fetchCurrentUser, {
    onSuccess: ({ isLoggedIn, username }) => {
      setCurrentUser({ isLoggedIn, username });
    }
  });

  if(isLoading) {
    return <div>loading...</div>;
  }

  if(isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="login" element={<Login/>}/>
      </Route>
      <Route path="/@:username" element={<Layout/>}>
        <Route index element={<UserHome/>}/>
        <Route path="posts/:postId" element={<PostDetail/>}/>
      </Route>
      <Route path="/write" element={<PostPublication/>}/>
    </Routes>
  );
};

export default App;
