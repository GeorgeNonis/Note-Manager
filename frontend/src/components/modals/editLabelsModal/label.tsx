import { LabelProps } from "./interfaces";
import styles from "./style.module.scss";
import { useLabel } from "./hooks";

const Label = ({ label }: LabelProps) => {
  const { state } = useLabel();

  return (
    <div
      ref={state.values.hoverOutsideLabel}
      className={styles.modalDiv}
      key={label}
      onMouseEnter={() =>
        state.actions.setMouseOverLabel(!state.values.mouseOverLabel)
      }
    >
      <div className={styles.label}></div>
      <input
        className={styles.modalEditInput}
        type="text"
        name={label}
        id={label}
        placeholder={label}
      />
      <div
        className={!state.values.edit ? styles.pencil : styles.tick}
        onClick={() => state.actions.setEdit(!state.values.edit)}
      ></div>
    </div>
  );
};
export default Label;
