import { NoteTitleProps } from "./interfaces";
import { StyledTitle } from "./styles";

const NoteTitle = ({
  title,
  setNoteTitle,
  editable = true,
}: NoteTitleProps) => {
  return (
    <StyledTitle
      readOnly={editable}
      name="notedetails"
      id="notedetails"
      spellCheck="true"
      placeholder="Empty note"
      value={title}
      onChange={(e) => {
        if (setNoteTitle) {
          setNoteTitle(e.target.value);
        }
      }}
    />
  );
};

export default NoteTitle;
