import { MdOutlineLabel } from "react-icons/md";
import styles from "./styles.module.scss";

const NoNotesMsg = () => {
  return (
    <div className={styles.noNotesDiv}>
      <MdOutlineLabel />
      <h3 className={styles.noNotesTitle}>No notes with this label yet</h3>
    </div>
  );
};
export default NoNotesMsg;
