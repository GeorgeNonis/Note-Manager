import { NoteProps } from "./interfaces";
import {
  Options,
  ReviewModal,
  Title,
  NoteDetails,
  Pin,
  NoteWrapper,
} from "../../index";
import { useNote } from "./useNote";
import { Transition } from "react-transition-group";
import styles from "../note.module.scss";
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
        setReview={actions.setReview}
        onClick={actions.handleExpand}
        styles={values.styles!}
        note={note}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragStart={onDragStart}
      >
        <Pin
          pinned={pinned}
          pinNoteHandler={actions.pinNoteHandler}
          styles={styles}
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
        {values.review && (
          <StyledActions>
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
        )}
        <Options
          review={values.review}
          note={note}
          pinned={pinned}
          styles={styles}
        />
      </NoteWrapper>
    </>
  );
};

export default Note;
