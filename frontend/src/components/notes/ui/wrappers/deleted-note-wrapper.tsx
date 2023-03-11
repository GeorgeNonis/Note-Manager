import { colorLogic, onReviewingNote } from "../../../../utils/utilsStyling";
import { DeletedNoteWrapperProps } from "./interfaces";
import styles from "../../note.module.scss";

const DeletedNoteWrapper = ({
  children,
  // clickOutsideNote,
  zIndex,
  review,
  note,
  setReview,
}: DeletedNoteWrapperProps) => {
  return (
    <div
      // ref={clickOutsideNote}
      style={{
        zIndex: zIndex,
        backgroundColor: colorLogic({ review, note }),
      }}
      className={onReviewingNote({ review, styles })}
      onClick={(e) => {
        e.stopPropagation();
        setReview(true);
      }}
      aria-multiline="true"
    >
      {children}
    </div>
  );
};
export default DeletedNoteWrapper;
