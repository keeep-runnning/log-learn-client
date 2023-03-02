import { Routes, Route } from "react-router-dom";

import { pageKeyword } from "../../utils/page";
import AuthChecker from "../../components/AuthChecker";
import NotFound from "../NotFound";
import MainSetting from "./MainSetting";
import PasswordSetting from "./PasswordSetting";
import SettingLayout from "./SettingLayout";

export default function Settings() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthChecker>
            <SettingLayout />
          </AuthChecker>
        }
      >
        <Route index element={<MainSetting />} />
        <Route path={pageKeyword.password} element={<PasswordSetting />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
