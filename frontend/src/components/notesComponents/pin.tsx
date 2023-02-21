import { BsPinAngle, BsFillPinFill } from "react-icons/bs";

interface Props {
  styles: CSSModuleClasses;
  pinned: boolean;
  pinNoteHandler: (e: React.MouseEvent) => void;
}

const Pin = ({ styles, pinned, pinNoteHandler }: Props) => {
  return (
    <div className={styles.pin} onClick={pinNoteHandler}>
      {pinned ? (
        <BsFillPinFill className={`${styles.pinned} ${styles.icon}`} />
      ) : (
        <BsPinAngle className={styles.icon} />
      )}
      <span className={styles.span}>{pinned ? "Unpin Note" : "Pin note"}</span>
    </div>
  );
};
export default Pin;
