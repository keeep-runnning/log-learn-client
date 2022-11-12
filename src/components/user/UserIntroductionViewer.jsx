import "@toast-ui/editor/dist/toastui-editor.css";
import { useOutletContext } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import EmptyMessage from "../common/EmptyMessage";

export default function UserIntroductionViewer() {
  const { userData } = useOutletContext();

  if (!userData.introduction) {
    return <EmptyMessage message="아직 소개가 작성되지 않았습니다" />;
  }

  return <Viewer initialValue={userData.introduction} usageStatistics={false} />;
}
