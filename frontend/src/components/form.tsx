import { BsPinAngle } from "react-icons/bs";
import styles from "../styles/App.module.scss";
import Input from "./input";

interface Props {
  display: boolean;
  noteStlye: string;
  onChangeNote: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  note: string;
  setDisplay: (arg: boolean) => void;
  title: string;
}

const Inputs = ({
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
          <div className={styles.pin}>
            <BsPinAngle className={styles.icon} />
            <span className={styles.span}>Pin note</span>
          </div>
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

export default Inputs;
