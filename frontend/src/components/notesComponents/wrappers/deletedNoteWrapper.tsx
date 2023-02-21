import { Dispatch, SetStateAction } from "react";
import { Notes } from "../../../interfaces/interfaces";
import { colorLogic, onReviewingNote } from "../../../utils/utilsStyling";
import styles from "../../../styles/note.module.scss";

interface Props {
  children: React.ReactNode;
  review: boolean;
  note: Notes;
  zIndex: number;
  setReview: Dispatch<SetStateAction<boolean>>;
  clickOutsideNote: React.MutableRefObject<any>;
}

const DeletedNoteWrapper = ({
  children,
  clickOutsideNote,
  zIndex,
  review,
  note,
  setReview,
}: Props) => {
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
      aria-multiline="true"
    >
      {children}
    </div>
  );
};
export default DeletedNoteWrapper;
