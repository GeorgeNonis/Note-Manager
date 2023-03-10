import { useNotesContenxt } from "../sections/existing-notes-section/existing-notes-store";
import Input from "./inputText";
import { FormProps } from "./interfaces";
import styles from "./styles.module.scss";

const Form = () => {
  const store = useNotesContenxt();
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
      {store?.values.display && (
        <button className={styles.closeFormButton}>Close</button>
      )}
    </>
  );
};

export default Form;
