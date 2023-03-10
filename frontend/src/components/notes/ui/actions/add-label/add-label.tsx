import { AiOutlinePlus } from "react-icons/ai";
import { CheckBox } from "./check-box";
import { AddLabelProps } from "./interfaces";
import { useAddLabel } from "./useAddLabel";
import styles from "./styles.module.scss";

const AddLabel = ({ id, pinned }: AddLabelProps) => {
  const { doesLabelExist, value, setValue, handlers, labels } = useAddLabel({
    id,
    pinned,
  });
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
      {labels && (
        <ul className={styles.labelsUl}>
          {labels.map((obj) => {
            return (
              <CheckBox handlers={handlers} id={id} obj={obj} key={obj.label} />
            );
          })}
        </ul>
      )}
      {value && !doesLabelExist && (
        <div
          className={styles.labelcreatecheckbox}
          /**
           * With the http post request to send the id and the pin status of the note
           */
          onClick={() => handlers.addLabelHandler()}
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
