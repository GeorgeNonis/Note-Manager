import { BiArchiveIn } from "react-icons/bi";
import styles from "./style.module.scss";

const NoArchievedNotesMsg = () => {
  return (
    <div className={styles.noNotesDiv}>
      <BiArchiveIn />
      <h3 className={styles.noNotesTitle}>No archieved Notes yet!</h3>
    </div>
  );
};
export default NoArchievedNotesMsg;
