import { BsImage } from "react-icons/bs";
import { IoMdColorPalette } from "react-icons/io";
import { AiOutlineBell } from "react-icons/ai";
import ColorPallete from "../colorPallete";
import { OptionsProps } from "./interfaces";
import { useOptions } from "./useOptions";
import styles from "../../../note.module.scss";

const Options = ({ id, pinned }: OptionsProps) => {
  const {
    display,
    displayPalette,
    deleteHandler,
    outsideOptions,
    outsidePalette,
    setDisplay,
    setDisplayPalette,
  } = useOptions({ id, pinned });
  return (
    <div className={styles.optionsContent} onClick={(e) => e.stopPropagation()}>
      <div className={styles.style}>
        <div
          role={"button"}
          onClick={() => setDisplayPalette(!displayPalette)}
          className={styles.option}
        >
          <IoMdColorPalette />
          <h3>Background Options</h3>
        </div>

        <div className={styles.option} role={"button"}>
          <BsImage />
          <h3>Upload Image</h3>
        </div>

        <div className={styles.option} role={"button"}>
          <AiOutlineBell />
          <h3>Remind me</h3>
        </div>
        <div
          role={"button"}
          className={styles.option}
          onClick={(e) => {
            e.stopPropagation();
            setDisplay(!display);
          }}
        >
          ...
          <h3 className={display ? styles.hide : undefined}>More Tools</h3>
        </div>
      </div>
      {displayPalette && (
        <div ref={outsidePalette}>
          <ColorPallete
            closePalette={setDisplayPalette}
            id={id}
            pinned={pinned}
          />
        </div>
      )}
      {display && (
        <div className={styles.options} ref={outsideOptions}>
          <h3 onClick={deleteHandler} role={"button"}>
            Delete
          </h3>
          <h3>Add Label</h3>
          <h3>Make Copy</h3>
          <h3>Show Checkboxes</h3>
        </div>
      )}
    </div>
  );
};

export default Options;
