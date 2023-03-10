import Input from "./inputText";
import { FormProps } from "./interfaces";
import styles from "./styles.module.scss";

const Form = ({
  display,
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
          <Input onChange={onChangeTitle} value={title} placeholder={"Title"} />
        </>
      )}
      <Input
        onChange={onChangeNote}
        placeholder={"Take a note..."}
        value={note}
        onClick={() => {
          setDisplay(true);
        }}
      />
      {display && <button className={styles.closeFormButton}>Close</button>}
    </>
  );
};

export default Form;
