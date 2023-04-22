import { DiscardBoxesProps } from "./interfaces";
import styles from "./styles.module.scss";

const DiscardBoxes = ({
  closeModal,
  checkboxhandler,
  transitionState,
}: DiscardBoxesProps) => {
  const cssClasses = [
    styles.modalContent,
    transitionState === "entering"
      ? styles.openModal
      : transitionState === "exiting"
      ? styles.closeModal
      : null,
  ];
  return (
    <>
      <div className={styles.backdrop} onClick={() => closeModal()}></div>
      <div className={cssClasses.join(" ")}>
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
