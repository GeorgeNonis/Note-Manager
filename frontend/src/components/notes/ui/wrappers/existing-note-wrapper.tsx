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
  setReview,
  onDragStart,
  onDragEnter,
  onDragEnd,
  dragable,
}: ExistingNoteWrapperProps) => {
  return (
    <div
      style={{
        zIndex: zIndex,
        background:
          note.color.includes("#") || note.color === "transparent"
            ? "#202124"
            : `url(${note.color})`,
      }}
      className={onReviewingNote({ review, styles })}
      onClick={(e) => {
        e.stopPropagation();
        setReview(true);
      }}
      draggable={dragable}
      onDragStart={(e) => onDragStart(e, position, pinned, note.id)}
      onDragEnter={(e) => onDragEnter(e, position)}
      onDrop={(e) => onDragEnd(e)}
      onDragOver={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
};
export default ExistingNoteWrapper;
