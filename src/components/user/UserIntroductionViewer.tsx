import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";

export default function UserIntroductionViewer() {
  return <Viewer initialValue={"dummy user introduction"} usageStatistics={false} />;
}
