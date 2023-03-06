import ReactDOM from "react-dom";
import { DeleteLabelConfigModal } from "../../index";
import { LabelProps } from "./interfaces";
import { useLabel } from "./hooks";
import styles from "./style.module.scss";

const Label = ({ label }: LabelProps) => {
  const { state } = useLabel(label);

  return (
    <>
      {state.values.deleteConfig &&
        ReactDOM.createPortal(
          <DeleteLabelConfigModal state={state} />,
          document.getElementById("editLabelsModal")!
        )}

      <div
        ref={state.values.hoverOutsideLabel}
        className={styles.modalDiv}
        key={label}
        onMouseEnter={() =>
          state.actions.setMouseOverLabel(!state.values.mouseOverLabel)
        }
      >
        <div
          className={styles.label}
          onClick={() => state.actions.setDeleteConfig(true)}
        ></div>
        <input
          onClick={() => state.actions.setEdit(true)}
          onChange={(e) => {
            state.actions.setNewLabel(e.target.value);
          }}
          ref={state.values.inputRef}
          className={styles.modalEditInput}
          type="text"
          name={label}
          id={label}
          defaultValue={label}
        />
        <div
          className={!state.values.edit ? styles.pencil : styles.tick}
          onClick={state.actions.OnEditHandler}
        ></div>
      </div>
    </>
  );
};
export default Label;
