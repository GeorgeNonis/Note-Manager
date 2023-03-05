import { BsImage } from "react-icons/bs";
import { IoMdColorPalette } from "react-icons/io";
import { AiOutlineBell } from "react-icons/ai";
import ColorPallete from "../colorPallete";
import { OptionsProps } from "./interfaces";
import { useOptions } from "./useOptions";
import Option from "./option";
import AddLabel from "../addLabel";
import styles from "../../../note.module.scss";

const Options = ({ id, pinned }: OptionsProps) => {
  const { handlers, outsideOptions, state, useStyles } = useOptions({
    id,
    pinned,
    styles,
  });

  return (
    <div
      className={useStyles.contentStyle}
      onClick={(e) => e.stopPropagation()}
      ref={outsideOptions}
    >
      <div className={useStyles.optionsStyle}>
        <Option
          text="Background Options"
          onClick={() => state.setDisplayPalette(!state.displayPalette)}
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
            handlers.openDotOptions();
          }}
          textStyle={state.display ? styles.hide : undefined}
        >
          ...
        </Option>
      </div>
      {state.displayPalette && (
        <div>
          <ColorPallete
            setDisplayPalette={state.setDisplayPalette}
            id={id}
            pinned={pinned}
          />
        </div>
      )}
      {state.displayAddLabel && <AddLabel id={id} pinned={pinned} />}
      {state.display && (
        <div className={styles.options}>
          <h3 onClick={handlers.deleteHandler} role={"button"}>
            Delete
          </h3>
          <h3 onClick={() => handlers.addLabelHandler()}>Add Label</h3>
          <h3 onClick={() => handlers.copyNoteHandler(id, pinned)}>
            Make Copy
          </h3>
          <h3>Show Checkboxes</h3>
        </div>
      )}
    </div>
  );
};

export default Options;
