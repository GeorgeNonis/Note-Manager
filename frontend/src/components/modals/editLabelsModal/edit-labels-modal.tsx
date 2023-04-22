import { Props } from "./interfaces";
import { useEditLabelsModal } from "./hooks";
import Label from "./label";
import styles from "./style.module.scss";

const EditLabelsModal = ({ closeModal, transState }: Props) => {
  const { state } = useEditLabelsModal(closeModal);

  const cssClasses = [
    styles.modalContent,
    transState === "entering"
      ? styles.openModal
      : transState === "exiting"
      ? styles.closeModal
      : null,
  ];

  return (
    <>
      <div className={styles.backdrop} onClick={() => closeModal(false)}></div>
      <div className={cssClasses.join(" ")}>
        <div className={styles.modalEditing}>
          <h3 className={styles.modalTitle}>Edit labels</h3>
          <div className={styles.modalDiv}>
            <div
              id="x&plus"
              className={!state.values.createLabel ? styles.xmark : styles.plus}
              onClick={(e) => state.actions.createLabelHandler(e)}
            ></div>
            <input
              ref={state.values.newLabelRef}
              type="text"
              placeholder="Create new label"
              value={state.values.label}
              className={styles.modalInput}
              onChange={(e) => state.actions.setLabel(e.target.value)}
              onClick={state.actions.onClickCreateLabelInputHandler}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                state.actions.createLabelHandler(e);
              }}
            />
            <div
              className={!state.values.createLabel ? styles.tick : undefined}
              onClick={(e) => state.actions.createLabelHandler(e)}
            ></div>
          </div>
          {state.values.labels.map((l) => {
            return <Label label={l.label} key={l.label} state={state} />;
          })}
        </div>
        <div className={styles.modalLabelButtonDiv}>
          <button
            className={styles.modalButton}
            onClick={() => closeModal(false)}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default EditLabelsModal;
