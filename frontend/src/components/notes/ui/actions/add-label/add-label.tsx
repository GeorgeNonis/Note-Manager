import { AiOutlinePlus } from "react-icons/ai";
import { CheckBox } from "./check-box";
import { AddLabelProps } from "./interfaces";
import { useAddLabel } from "./useAddLabel";
import styles from "./styles.module.scss";

const AddLabel = ({ id, pinned }: AddLabelProps) => {
  const { state } = useAddLabel({
    id,
    pinned,
  });
  return (
    <main className={styles.content}>
      <fieldset className={styles.labelfieldset}>
        <label htmlFor="label">Label note</label>
        <input
          ref={state.values.inputRef}
          type="text"
          id="label"
          onChange={(e) => state.actions.setValue(e.target.value)}
          placeholder="Enter label name"
        />
      </fieldset>
      {/* {HERE I SHOULD RENDER THE ALREADY LABELS THAT EXIST} */}
      {state.values.labels && (
        <ul className={styles.labelsUl}>
          {state.values.labels.map((obj) => {
            return (
              <CheckBox
                handlers={state.actions}
                id={id}
                obj={obj}
                key={obj.label}
              />
            );
          })}
        </ul>
      )}
      {state.values.value && !state.values.doesLabelExist && (
        <div
          className={styles.labelcreatecheckbox}
          /**
           * With the http post request to send the id and the pin status of the note
           */
          onClick={() => state.actions.addLabelHandler()}
        >
          <div className={styles.labeladdicon}>
            <AiOutlinePlus />
          </div>
          <div>{`Create "${state.values.value}"`}</div>
        </div>
      )}
    </main>
  );
};
export default AddLabel;
