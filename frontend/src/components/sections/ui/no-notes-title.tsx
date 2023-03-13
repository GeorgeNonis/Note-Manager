import { NoNotesTitleProps } from "./interfaces";

const NoNotesTitle = ({ state }: NoNotesTitleProps) => {
  return (
    <>
      {state.notes.length === 0 && state.pinnedNotes.length === 0 && (
        <p style={{ textAlign: "center" }}>No notes</p>
      )}
    </>
  );
};
export default NoNotesTitle;
