// import { useNotesContenxt } from "../sections/existing-notes-section/existing-notes-store";
import Input from "./inputText";
import { FormProps } from "./interfaces";
import styles from "./styles.module.scss";

const Form = ({ useStore }: FormProps) => {
  const disableBtn =
    useStore.values.title.length == 0 && useStore.values.note.length == 0;
  console.log(typeof useStore.actions.saveNote);
  return (
    <>
      {useStore.values.display && (
        <>
          <Input
            onChange={useStore.actions.onChangeTitle}
            value={useStore.values.title}
            placeholder={"Title"}
          />
        </>
      )}
      <Input
        onChange={useStore.actions.onChangeNote!}
        placeholder={"Take a note..."}
        value={useStore.values.note!}
        onClick={() => {
          useStore.actions.setDisplay(true);
        }}
      />
      <div className={styles.actions}>
        {useStore.values.display && (
          <button
            disabled={disableBtn}
            className={
              disableBtn
                ? styles.closeFormButtonDisabled
                : styles.closeFormButton
            }
            onClick={() => {
              console.log("clicking");
              useStore.actions.saveNote();
              useStore.actions.setDisplay(false);
            }}
          >
            Create Note
          </button>
        )}
        {useStore.values.display && (
          <button
            disabled={disableBtn}
            className={
              disableBtn
                ? styles.closeFormButtonDisabled
                : styles.closeFormButton
            }
            onClick={useStore.actions.clearInputs}
          >
            Clear Inputs
          </button>
        )}
        {useStore.values.display && (
          <button
            className={styles.closeFormButton}
            onClick={() => {
              useStore.actions.setDisplay(false);
            }}
          >
            Close
          </button>
        )}
      </div>
    </>
  );
};

export default Form;
