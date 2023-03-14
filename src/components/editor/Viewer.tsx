import "react-quill/dist/quill.bubble.css";
import "./viewer.css";

import ReactQuill from "react-quill";

import EmptyMessage from "../EmptyMessage";

type ViewerProps = {
  content: string;
  defaultMessage?: string;
};

export default function Viewer({ content, defaultMessage }: ViewerProps) {
  if (content === "" || content === "<p><br></p>") {
    return defaultMessage ? <EmptyMessage message={defaultMessage} /> : null;
  }

  return (
    <ReactQuill
      readOnly
      value={content}
      className="custom-viewer"
      theme="bubble"
    />
  );
}
