import { DeletedNote } from "../../index";
import { useDeletedNotesSection } from "./useDeletedNotesSection";
import { StyledSection, StyledWarning } from "./deleted-notes-section.styles";
import NoNotes from "../ui/noNotes";
import { BiTrash } from "react-icons/bi";

const DeletedNotesSection = () => {
  const { deletedNotes, loadingInitialState } = useDeletedNotesSection();

  return (
    <>
      <main>
        <StyledWarning>Notes in Trash are deleted after 7 days.</StyledWarning>
        {deletedNotes.length === 0 && !loadingInitialState ? (
          <NoNotes SVG={BiTrash} children={"No notes in Trash"} />
        ) : (
          <StyledSection>
            {deletedNotes.map((note, i) => {
              return <DeletedNote note={note} key={i} />;
            })}
          </StyledSection>
        )}
      </main>
    </>
  );
};

export default DeletedNotesSection;
