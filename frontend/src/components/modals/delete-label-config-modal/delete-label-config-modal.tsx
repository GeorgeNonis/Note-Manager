import { Props } from "./interfaces";
import { useDeleteLabelConfigModal } from "./useDeleteLabelConfigModal";
import styles from "./styles.module.scss";

const DeleteLabelConfigModal = ({ state }: Props) => {
  useDeleteLabelConfigModal(state.actions.setDeleteConfig);
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => state.actions.setDeleteConfig(false)}
      ></div>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>
          We’ll delete this label and remove it from all of your Keep notes.
          Your notes won’t be deleted.
        </h3>
        <div className={styles.actions}>
          <button onClick={() => state.actions.setDeleteConfig(false)}>
            Cancel
          </button>
          <button onClick={() => state.actions.deleteLabelHandler()}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
export default DeleteLabelConfigModal;
