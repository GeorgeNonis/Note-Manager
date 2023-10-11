import { Title, NoteDetails, DeletedNoteWrapper, Button } from "../../index";
import { Props } from "./interfaces";
import { useDeletedNote } from "./useDeletedNote";
import { StyledBackdrop } from "../../Molecules/Modal/modal.styles";
import { StyledActions, StyledButton } from "./delete-note.styles";

const DeletedNote = ({
  note,
  loading,
  removeProcess,
  restoreProcess,
}: Props) => {
  const { review, handleExpand } = useDeletedNote();
  return (
    <>
      <StyledBackdrop isOpen={review} onClick={handleExpand} />
      <DeletedNoteWrapper note={note} onClick={handleExpand} review={review}>
        <Title title={note.title} />
        <NoteDetails note={note} />
        <StyledActions autoFlow={"column"}>
          <StyledButton
            disabled={loading}
            onClick={(e) => restoreProcess(e, note.id)}
            size={"small"}
            variant={"reset"}
          >
            Restore Note
          </StyledButton>
          <StyledButton
            disabled={loading}
            variant={"reset"}
            onClick={(e) => removeProcess(e, note.id)}
            size={"small"}
          >
            Delete Note
          </StyledButton>
        </StyledActions>
      </DeletedNoteWrapper>
    </>
  );
};

export default DeletedNote;
