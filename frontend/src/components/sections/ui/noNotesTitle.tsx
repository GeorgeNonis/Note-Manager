import { InitialState } from "../../../store/notesSlice";

interface Props {
  state: InitialState;
}

const NoNotesTitle = ({ state }: Props) => {
  return (
    <>
      {state.notes.length === 0 && state.pinnedNotes.length === 0 && (
        <p style={{ textAlign: "center" }}>No notes</p>
      )}
    </>
  );
};
export default NoNotesTitle;
