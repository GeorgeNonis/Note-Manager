import { useNotesContenxt } from "../sections/existing-notes-section/existing-notes-store";
import Input from "./inputText";
import styles from "./styles.module.scss";

const Form = () => {
  const store = useNotesContenxt();
  const disableBtn =
    store?.values.title.length == 0 && store?.values.note.length == 0;
  return (
    <>
      {store?.values.display && (
        <>
          <Input
            onChange={store.actions.onChangeTitle}
            value={store.values.title}
            placeholder={"Title"}
          />
        </>
      )}
      <Input
        onChange={store?.actions.onChangeNote!}
        placeholder={"Take a note..."}
        value={store?.values.note!}
        onClick={() => {
          store?.actions.setDisplay(true);
        }}
      />
      <div className={styles.actions}>
        {store?.values.display && (
          <button
            disabled={disableBtn}
            className={
              disableBtn
                ? styles.closeFormButtonDisabled
                : styles.closeFormButton
            }
            onClick={() => {
              console.log("clicking");
              store.actions.saveNote();
              store.actions.setDisplay(false);
            }}
          >
            Create Note
          </button>
        )}
        {store?.values.display && (
          <button
            disabled={disableBtn}
            className={
              disableBtn
                ? styles.closeFormButtonDisabled
                : styles.closeFormButton
            }
            onClick={store.actions.clearInputs}
          >
            Clear Inputs
          </button>
        )}
        {store?.values.display && (
          <button
            className={styles.closeFormButton}
            onClick={() => {
              store?.actions.setDisplay(false);
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
