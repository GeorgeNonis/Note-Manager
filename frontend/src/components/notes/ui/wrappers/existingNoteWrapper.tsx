import { colorLogic, onReviewingNote } from "../../../../utils/utilsStyling";
import { ExistingNoteWrapperProps } from "./interfaces";
import styles from "../../note.module.scss";

const ExistingNoteWrapper = ({
  children,
  review,
  note,
  position,
  zIndex,
  pinned,
  clickOutsideNote,
  setReview,
  onDragStart,
  onDragEnter,
  onDragEnd,
  dragable,
}: ExistingNoteWrapperProps) => {
  return (
    <div
      ref={clickOutsideNote}
      style={{
        zIndex: zIndex,
        backgroundColor: colorLogic({ review, note }),
      }}
      className={onReviewingNote({ review, styles })}
      onClick={(e) => {
        e.stopPropagation();
        setReview(true);
      }}
      draggable={dragable}
      onDragStart={(e) => onDragStart(e, position, pinned, note.id)}
      onDragEnter={(e) => onDragEnter(e, position)}
      onDragEnd={onDragEnd}
    >
      {children}
    </div>
  );
};
export default ExistingNoteWrapper;
