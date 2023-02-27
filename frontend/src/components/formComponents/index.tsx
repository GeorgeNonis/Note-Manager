import Input from "./inputText";
import styles from "./styles.module.scss";
import { FormProps } from "./interfaces";

const Form = ({
  display,
  noteStlye,
  onChangeNote,
  onChangeTitle,
  note,
  setDisplay,
  title,
}: FormProps) => {
  return (
    <>
      {display && (
        <>
          <Input
            className={styles.noteTitle}
            onChange={onChangeTitle}
            value={title}
            placeholder={"Title"}
          />
        </>
      )}
      <Input
        className={noteStlye}
        onChange={onChangeNote}
        placeholder={"Tkae a note..."}
        value={note}
        onClick={() => {
          setDisplay(true);
        }}
      />
    </>
  );
};

export default Form;
