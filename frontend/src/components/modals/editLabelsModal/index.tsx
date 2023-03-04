import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import { HiXMark } from "react-icons/hi2";
import styles from "./style.module.scss";
import { Props } from "./interfaces";
import Label from "./label";

const EditLabelsModal = ({ closeModal }: Props) => {
  const labels = useSelector((state: IRootState) => {
    return state.notes.labels;
  });

  return (
    <>
      <div className={styles.backdrop} onClick={() => closeModal(false)}></div>
      <div className={styles.modalContent}>
        <div className={styles.modalEditing}>
          <h3 className={styles.modalTitle}>Edit labels</h3>
          <div className={styles.modalDiv}>
            <HiXMark />
            <input
              type="text"
              placeholder="Create new label"
              className={styles.modalInput}
            />
          </div>
          {labels.map((l) => {
            return <Label label={l.label} key={l.label} />;
          })}
        </div>
        <div className={styles.modalLabelButtonDiv}>
          <button className={styles.modalButton}>Done</button>
        </div>
      </div>
    </>
  );
};

export default EditLabelsModal;
