import "react-quill/dist/quill.bubble.css";
import "./viewer.css";

import ReactQuill from "react-quill";

type ViewerProps = {
  content: string;
};

export default function Viewer({ content }: ViewerProps) {
  return <ReactQuill readOnly value={content} className="custom-viewer" theme="bubble" />;
}
