import { AiOutlinePlus } from "react-icons/ai";
import { AddLabelProps } from "./interfaces";
import styles from "./styles.module.scss";
import { useAddLabel } from "./useTest";

const AddLabel = ({ id, pinned }: AddLabelProps) => {
  const { value, setValue, addNoteHandler } = useAddLabel({ id, pinned });
  return (
    <main className={styles.content}>
      <fieldset className={styles.labelfieldset}>
        <label htmlFor="label">Label note</label>
        <input
          type="text"
          id="label"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter label name"
        />
      </fieldset>
      {/* {HERE I SHOULD RENDER THE ALREADY LABELS THAT EXIST} */}
      {value && (
        <div
          className={styles.labelcreatecheckbox}
          /**
           * With the http post request to send the id and the pin status of the note
           */
          onClick={() => addNoteHandler()}
        >
          <div className={styles.labeladdicon}>
            <AiOutlinePlus />
          </div>
          <div>{`Create "${value}"`}</div>
        </div>
      )}
    </main>
  );
};
export default AddLabel;
