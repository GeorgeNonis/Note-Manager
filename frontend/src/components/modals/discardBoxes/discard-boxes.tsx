import { DiscardBoxesProps } from "./interfaces";
import styles from "./styles.module.scss";

const DiscardBoxes = ({ closeModal, checkboxhandler }: DiscardBoxesProps) => {
  return (
    <>
      <div className={styles.backdrop} onClick={() => closeModal()}></div>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Discard Checkboxes</h3>
        <div className={styles.actions}>
          <button id="no" onClick={() => closeModal()}>
            No
          </button>
          <button id="discard" onClick={(e) => checkboxhandler(e)}>
            Discard
          </button>
        </div>
      </div>
    </>
  );
};
export default DiscardBoxes;
