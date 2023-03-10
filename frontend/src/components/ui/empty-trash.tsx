import { BiTrash } from "react-icons/bi";
import styles from "./styles.module.scss";

const EmptyTrash = () => {
  return (
    <div className={styles.content}>
      <BiTrash />
      <h3>No notes in Trash</h3>
    </div>
  );
};
export default EmptyTrash;
