import { Title, NoteDetails, DeletedNoteWrapper, Button } from "../../index";
import { DeletedNoteProps } from "./interfaces";
import { useDeletedNote } from "./useDeletedNote";
import { StyledBackdrop } from "../../Molecules/Modal/modal.styles";
import { StyledActions, StyledButton } from "./delete-note.styles";
import { StyledLoadingSemiCircle } from "../../../../globalStyles";

const DeletedNote = ({
  note,
  removeProcess,
  restoreProcess,
  loading,
}: DeletedNoteProps) => {
  const { review, handleExpand } = useDeletedNote();
  const { removeLoading, restoreLoading } = loading;
  return (
    <>
      <StyledBackdrop isOpen={review} onClick={handleExpand} />
      <DeletedNoteWrapper note={note} onClick={handleExpand} review={review}>
        <Title title={note.title} />
        <NoteDetails note={note} />
        <StyledActions autoFlow={"column"}>
          <StyledButton
            disabled={removeLoading || restoreLoading}
            onClick={(e) => restoreProcess(e, note.id)}
            size={"small"}
            variant={"reset"}
          >
            {restoreLoading ? <StyledLoadingSemiCircle /> : "Restore Note"}
          </StyledButton>
          <StyledButton
            disabled={removeLoading || restoreLoading}
            variant={"reset"}
            onClick={(e) => removeProcess(e, note.id)}
            size={"small"}
          >
            {removeLoading ? <StyledLoadingSemiCircle /> : "Delete Note"}
          </StyledButton>
        </StyledActions>
      </DeletedNoteWrapper>
    </>
  );
};

export default DeletedNote;
