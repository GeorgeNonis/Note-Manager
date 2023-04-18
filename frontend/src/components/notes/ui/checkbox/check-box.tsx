import { CheckBoxProps } from "./interfaces";
import { useCheckBox } from "./hooks/useCheckBox";
import styles from "./styles.module.scss";

const Checkbox = ({
  checkBoxDetails,
  checked,
  pinned,
  id,
  archived,
}: CheckBoxProps) => {
  const { checkHandler, loading } = useCheckBox({
    archived,
    pinned,
    boxid: checkBoxDetails.id,
    noteId: id,
    checked,
  });
  return (
    <div
      className={
        !loading ? styles.content : `${styles.content} ${styles.invalid}`
      }
      contentEditable={"false"}
      spellCheck="true"
      aria-multiline="true"
      suppressContentEditableWarning
      onClick={!loading ? checkHandler : undefined}
    >
      <div className={checked ? styles.checkedSvg : styles.uncheckedSvg}></div>
      <div className={checked ? styles.checked : undefined}>
        {checkBoxDetails.note}
      </div>
    </div>
  );
};
export default Checkbox;
