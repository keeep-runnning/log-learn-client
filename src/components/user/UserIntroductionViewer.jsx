import "@toast-ui/editor/dist/toastui-editor.css";
import { useOutletContext } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import { Text } from "@chakra-ui/react";

export default function UserIntroductionViewer() {
  const { userData } = useOutletContext();

  if (!userData.introduction) {
    return (
      <Text textAlign="center" px={4} py={8} color="gray.500" fontSize="lg">
        아직 소개가 작성되지 않았습니다
      </Text>
    );
  }

  return <Viewer initialValue={userData.introduction} usageStatistics={false} />;
}
