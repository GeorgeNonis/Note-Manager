import Input from "./inputText";
import styles from "../../styles/App.module.scss";

interface Props {
  display: boolean;
  noteStlye: string;
  onChangeNote: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  note: string;
  setDisplay: (arg: boolean) => void;
  title: string;
}

const Form = ({
  display,
  noteStlye,
  onChangeNote,
  onChangeTitle,
  note,
  setDisplay,
  title,
}: Props) => {
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
