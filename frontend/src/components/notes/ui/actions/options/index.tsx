import { BsImage } from "react-icons/bs";
import { IoMdColorPalette } from "react-icons/io";
import { AiOutlineBell } from "react-icons/ai";
import ColorPallete from "../colorPallete";
import { OptionsProps } from "./interfaces";
import { useOptions } from "./useOptions";
import Option from "./option";
import styles from "../../../note.module.scss";

const Options = ({ id, pinned }: OptionsProps) => {
  const {
    display,
    displayPalette,
    deleteHandler,
    outsideOptions,
    setDisplay,
    setDisplayPalette,
    contentStyle,
    optionsStyle,
    copyNoteHandler,
  } = useOptions({ id, pinned, styles });

  return (
    <div
      className={contentStyle}
      onClick={(e) => e.stopPropagation()}
      ref={outsideOptions}
    >
      <div className={optionsStyle}>
        <Option
          text="Background Options"
          onClick={() => setDisplayPalette(!displayPalette)}
        >
          <IoMdColorPalette />
        </Option>
        <Option text="Upload Image">
          <BsImage />
        </Option>
        <Option text="Remind me">
          <AiOutlineBell />
        </Option>
        <Option
          text="More Tools"
          onClick={(e) => {
            e.stopPropagation();
            setDisplay(!display);
          }}
          textStyle={display ? styles.hide : undefined}
        >
          ...
        </Option>
      </div>
      {displayPalette && (
        <div>
          <ColorPallete
            setDisplayPalette={setDisplayPalette}
            id={id}
            pinned={pinned}
          />
        </div>
      )}
      {display && (
        <div className={styles.options}>
          <h3 onClick={deleteHandler} role={"button"}>
            Delete
          </h3>
          <h3>Add Label</h3>
          <h3 onClick={() => copyNoteHandler(id, pinned)}>Make Copy</h3>
          <h3>Show Checkboxes</h3>
        </div>
      )}
    </div>
  );
};

export default Options;
