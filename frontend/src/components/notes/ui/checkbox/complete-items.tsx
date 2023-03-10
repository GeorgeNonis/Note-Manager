import { CompletedItems } from "./interfaces";
import { useCompleteItems } from "./hooks/useCompleteItems";
import { NumberOfCompleteItems } from "./utils";
import { Checkbox } from "../../../index";
import styles from "./styles.module.scss";

const CompleteItems = ({ completedItems, pinned, id }: CompletedItems) => {
  const { showItemsHandler, state } = useCompleteItems();
  return (
    <>
      <div
        onClick={showItemsHandler}
        className={styles.arrowAndTitleDiv}
        contentEditable="false"
        suppressContentEditableWarning
      >
        <div className={state ? styles.close : styles.open}></div>
        <div className={styles.completeItemsTitle}>
          {NumberOfCompleteItems(completedItems.length)}
        </div>
      </div>
      {state &&
        completedItems.map((info) => {
          return (
            <Checkbox
              id={id}
              checkBoxDetails={info}
              checked={true}
              key={info.id}
              pinned={pinned}
            />
          );
        })}
    </>
  );
};
export default CompleteItems;
