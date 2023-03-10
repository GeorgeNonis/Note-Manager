import { useNotesContenxt } from "../existing-notes-section/existing-notes-store";

const NoNotesTitle = () => {
  const store = useNotesContenxt();
  return (
    <>
      {store?.values.state.notes.length === 0 &&
        store?.values.state.pinnedNotes.length === 0 && (
          <p style={{ textAlign: "center" }}>No notes</p>
        )}
    </>
  );
};
export default NoNotesTitle;
