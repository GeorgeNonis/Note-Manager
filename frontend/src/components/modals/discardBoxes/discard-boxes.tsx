import styles from "./styles.module.scss";

const DiscardBoxes = ({
  handler,
}: {
  handler: (e: React.MouseEvent<HTMLButtonElement>) => any;
}) => {
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Discard Checkboxes</h3>
        <div className={styles.actions}>
          <button id="no" onClick={handler}>
            No
          </button>
          <button id="discard" onClick={handler}>
            Discard
          </button>
        </div>
      </div>
    </>
  );
};
export default DiscardBoxes;
