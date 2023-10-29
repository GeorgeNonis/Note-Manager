import { DeletedNote } from "../../index";
import { useDeletedNotesSection } from "./useDeletedNotesSection";
import { StyledSection, StyledWarning } from "./deleted-notes-section.styles";
import NoNotes from "../ui/noNotes";
import { BiTrash } from "react-icons/bi";

const DeletedNotesSection = () => {
  const { state, handlers } = useDeletedNotesSection();

  return (
    <>
      <main>
        <StyledWarning>Notes in Trash are deleted after 7 days.</StyledWarning>
        {state.notes.deletedNotes.length === 0 &&
        !state.displayState.loadingInitialState ? (
          <NoNotes SVG={BiTrash} children={"No notes in Trash"} />
        ) : (
          <StyledSection>
            {state.notes.deletedNotes.map((note, i) => {
              return (
                <DeletedNote
                  note={note}
                  key={i}
                  {...handlers}
                  loading={state.loading}
                />
              );
            })}
          </StyledSection>
        )}
      </main>
    </>
  );
};

export default DeletedNotesSection;
