import { CheckBoxProps } from "./interfaces";
import { useCheckBox } from "./useCheckBox";
import styles from "./styles.module.scss";

const Checkbox = ({ checkBoxDetails, checked, pinned, id }: CheckBoxProps) => {
  const { checkHandler } = useCheckBox({
    pinned,
    boxid: checkBoxDetails.id,
    noteId: id,
    checked,
  });
  return (
    <div className={styles.content}>
      <div
        className={checked ? styles.checked : styles.unchecked}
        onClick={checkHandler}
      ></div>
      <div>{checkBoxDetails.note}</div>
      <div className={styles.xmark}></div>
    </div>
  );
};
export default Checkbox;
