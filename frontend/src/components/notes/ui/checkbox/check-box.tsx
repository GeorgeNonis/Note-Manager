import { CheckBoxProps } from "./interfaces";
import { useCheckBox } from "./hooks/useCheckBox";
import styles from "./styles.module.scss";

const Checkbox = ({ checkBoxDetails, checked, pinned, id }: CheckBoxProps) => {
  const { checkHandler } = useCheckBox({
    pinned,
    boxid: checkBoxDetails.id,
    noteId: id,
    checked,
  });
  return (
    <div
      className={styles.content}
      contentEditable={"false"}
      spellCheck="true"
      aria-multiline="true"
      suppressContentEditableWarning
    >
      <div
        className={checked ? styles.checkedSvg : styles.uncheckedSvg}
        onClick={checkHandler}
      ></div>
      <div className={checked ? styles.checked : undefined}>
        {checkBoxDetails.note}
      </div>
    </div>
  );
};
export default Checkbox;
