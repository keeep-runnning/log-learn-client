import "@toast-ui/editor/dist/toastui-editor.css";

import { css } from "@emotion/react";
import { useOutletContext } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";

import MessageBox from "../common/MessageBox";

const UserIntroductionViewer = () => {
  const { userData } = useOutletContext();

  if (!userData.introduction) {
    return <MessageBox message="아직 소개가 작성되지 않았습니다." />;
  }

  return (
    <div
      css={(theme) => css`
        padding: ${theme.spacing[4]};
      `}
    >
      <Viewer initialValue={userData.introduction} usageStatistics={false} />
    </div>
  );
};

export default UserIntroductionViewer;
