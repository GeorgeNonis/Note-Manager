import { Title, NoteDetails, DeletedNoteWrapper } from "../../index";
import { Props } from "./interfaces";
import { useDeletedNote } from "./useDeletedNote";
import { StyledBackdrop } from "../../Molecules/Modal/modal.styles";
import { StyledActions } from "./delete-note.styles";

const DeletedNote = ({ note, zindex }: Props) => {
  const { review, restoreProcess, removeProcess, handleExpand, zIndex } =
    useDeletedNote({ note, zindex });
  return (
    <>
      <StyledBackdrop isOpen={review} onClick={handleExpand} />
      <DeletedNoteWrapper
        note={note}
        onClick={handleExpand}
        review={review}
        zIndex={zIndex}
      >
        <Title title={note.title} />
        <NoteDetails note={note} />
        <StyledActions autoFlow={"column"}>
          <button onClick={restoreProcess}>Restore Note</button>
          <button onClick={removeProcess}>Delete Note</button>
        </StyledActions>
      </DeletedNoteWrapper>
    </>
  );
};

export default DeletedNote;
