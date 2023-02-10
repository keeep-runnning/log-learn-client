import "react-quill/dist/quill.snow.css";
import "./editor.css";

import ReactQuill from "react-quill";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
];

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <ReactQuill
      className="editor"
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
    />
  );
}
