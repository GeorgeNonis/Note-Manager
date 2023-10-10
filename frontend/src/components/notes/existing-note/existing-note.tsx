import { NoteProps } from "./interfaces";
import { Options, Title, NoteDetails, Pin, NoteWrapper } from "../../index";
import { useNote } from "./useNote";
import { StyledBackdrop } from "../../Molecules/Modal/modal.styles";
import { StyledActions, StyledButton } from "../ui/styles";

const Note = ({
  note,
  position,
  onDragEnd,
  onDragEnter,
  onDragStart,
  zindex,
  pinned = true,
  dragable = true,
}: NoteProps) => {
  const { state } = useNote({ note, pinned, zindex });
  const { actions, values } = state;

  return (
    <>
      <StyledBackdrop isOpen={values.review} onClick={actions.handleExpand} />
      <NoteWrapper
        dragable={dragable}
        zIndex={values.zIndex}
        position={position}
        pinned={pinned}
        review={values.review}
        onClick={actions.handleExpand}
        note={note}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragStart={onDragStart}
      >
        <Pin
          review={values.review}
          pinned={pinned}
          pinNoteHandler={actions.pinNoteHandler}
        />

        <Title
          editable={false}
          title={values.noteTitle}
          setNoteTitle={actions.setNoteTitle}
        />
        <NoteDetails
          editable={false}
          setNotedetails={actions.setNotedetails}
          pinned={pinned}
          note={note}
          noteValue={values.noteValue}
          checkbox={note.checkbox}
        />
        <StyledActions autoFlow={"column"} centerItems={true}>
          <StyledButton
            disabled={values.disableBtn}
            onKeyDown={(e) => {
              e.key === "Enter" && actions.saveChanges();
            }}
            onClick={actions.saveChanges}
          >
            Save Changes
          </StyledButton>
          <StyledButton onClick={actions.handleExpand}>Close</StyledButton>
        </StyledActions>
        <Options note={note} pinned={pinned} />
      </NoteWrapper>
    </>
  );
};

export default Note;
