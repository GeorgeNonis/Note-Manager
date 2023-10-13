import { EmptyTrash, DeletedNote } from "../../index";
import { useDeletedNotesSection } from "./useDeletedNotesSection";
import { StyledSection, StyledWarning } from "./deleted-notes-section.styles";

const DeletedNotesSection = () => {
  const { state, handlers } = useDeletedNotesSection();

  return (
    <>
      <main>
        <StyledWarning>Notes in Trash are deleted after 7 days.</StyledWarning>
        <StyledSection>
          {state.notes.deletedNotes.length === 0 &&
          !state.displayState.loadingInitialState ? (
            <EmptyTrash />
          ) : (
            state.notes.deletedNotes.map((note, i) => {
              return (
                <DeletedNote
                  note={note}
                  key={i}
                  {...handlers}
                  loading={state.loading}
                />
              );
            })
          )}
        </StyledSection>
      </main>
    </>
  );
};

export default DeletedNotesSection;
