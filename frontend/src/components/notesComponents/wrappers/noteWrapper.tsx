import { Dispatch, SetStateAction } from "react";
import { NoteObj } from "../../../interfaces/interfaces";
import styles from "../../../styles/note.module.scss";
import { colorLogic, onReviewingNote } from "../../../utils/utilsStyling";

interface Props {
  children: React.ReactNode;
  review: boolean;
  note: NoteObj;
  pinned: boolean;
  position: number;
  zIndex: number;
  setReview: Dispatch<SetStateAction<boolean>>;
  onDragEnd: () => void;
  onDragEnter: (e: React.DragEvent, position: number) => void;
  onDragStart: (
    e: React.DragEvent,
    position: number,
    pinned: boolean,
    id: string
  ) => void;
  clickOutsideNote: React.MutableRefObject<any>;
}

const NoteWrapper = ({
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
      draggable={true}
      onDragStart={(e) => onDragStart(e, position, pinned, note.id)}
      onDragEnter={(e) => onDragEnter(e, position)}
      onDragEnd={onDragEnd}
    >
      {children}
    </div>
  );
};
export default NoteWrapper;
