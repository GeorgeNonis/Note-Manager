import { NoteTitleProps } from "./interfaces";

const NoteTitle = ({ titleRef, title, editable }: NoteTitleProps) => {
  return (
    <h3
      style={{ overflowWrap: `${editable ? "unset" : "anywhere"}` }}
      ref={titleRef}
      contentEditable={editable ? "true" : "false"}
      spellCheck="true"
      aria-multiline="true"
      suppressContentEditableWarning
    >
      {title}
    </h3>
  );
};

export default NoteTitle;
