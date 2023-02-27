import { NotePinProps } from "./interfaces";
import { BsPinAngle, BsFillPinFill } from "react-icons/bs";

const Pin = ({ styles, pinned, pinNoteHandler }: NotePinProps) => {
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
