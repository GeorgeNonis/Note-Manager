import { NoteProps } from "./interfaces";
import { Options, Title, NoteDetails, NoteWrapper } from "../../../../index";
import { useArchivedNote } from "./useArchivedNote";
import { StyledBackdrop } from "../../../../Molecules/Modal/modal.styles";
import { StyledActions, StyledButton } from "../../../../notes/ui/styles";

const Note = ({ note, position }: NoteProps) => {
  const { state } = useArchivedNote({ note });
  const { actions, values } = state;
  return (
    <>
      <StyledBackdrop isOpen={values.review} onClick={actions.handleExpand} />
      <NoteWrapper
        dragable={false}
        position={position}
        pinned={false}
        review={state.values.review}
        onClick={actions.handleExpand}
        note={note}
        onDragEnd={() => {}}
        onDragEnter={() => {}}
        onDragStart={() => {}}
      >
        <Title
          editable={false}
          title={state.values.noteTitle}
          setNoteTitle={state.actions.setNoteTitle}
        />
        <NoteDetails
          archived={true}
          editable={false}
          setNotedetails={state.actions.setNotedetails}
          pinned={false}
          note={note}
          noteValue={state.values.noteValue}
          checkbox={note.checkbox}
        />

        <StyledActions autoFlow={"column"} centerItems={true}>
          <StyledButton
            disabled={state.values.disableBtn}
            onKeyDown={(e) => {
              e.key === "Enter" && state.actions.saveChanges();
            }}
            onClick={state.actions.saveChanges}
          >
            Save Changes
          </StyledButton>
          <StyledButton onClick={actions.handleExpand}>Close</StyledButton>
        </StyledActions>
        <Options archived={true} note={note} pinned={false} />
      </NoteWrapper>
    </>
  );
};

export default Note;
