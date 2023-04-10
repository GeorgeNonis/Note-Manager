import { Suspense } from "react";
import ReactDOM from "react-dom";
import { IoMdColorPalette } from "react-icons/io";
import ColorPallete from "../color-pallete";
import { OptionsProps } from "./interfaces";
import { useOptions } from "./useOptions";
import Option from "./option";
import AddLabel from "../add-label";
import DiscardBoxes from "../../../../modals/discard-boxes";
import styles from "../../../note.module.scss";
import BackgroundImage from "../backgroundimage/backgroundImage";

const Options = ({ note, pinned, review }: OptionsProps) => {
  const { checkbox, id } = note;
  const { handlers, outsideOptions, state, useStyles } = useOptions({
    note,
    pinned,
    styles,
    review,
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
      {/* {state.displayPalette && (
        <div className={styles.colorPallete}>
          <ColorPallete
            setDisplayPalette={state.setDisplayPalette}
            id={id}
            pinned={pinned}
          />
        </div>
      )} */}
      {state.displayAddLabel && <AddLabel id={id} pinned={pinned} />}
      {state.display && (
        <div className={styles.options}>
          <h3 onClick={handlers.deleteHandler} role={"button"}>
            Delete
          </h3>
          <h3 onClick={() => handlers.addLabelHandler()}>Add Label</h3>
          <h3 onClick={() => handlers.copyNoteHandler(id, pinned)}>
            Make a Copy
          </h3>
          <h3 onClick={(e) => handlers.checkBoxesHandler(e)}>
            {!checkbox ? "Create checkboxes" : "Discard checkboxes"}
          </h3>
        </div>
      )}
      {state.displayPalette &&
        ReactDOM.createPortal(
          <Suspense fallback={"...loading"}>
            <BackgroundImage
              setDisplayPalette={state.setDisplayPalette}
              id={id}
              pinned={pinned}
            />
          </Suspense>,
          document.getElementById("backgroundimage")!
        )}
      {state.discardBoxes &&
        ReactDOM.createPortal(
          <DiscardBoxes
            closeModal={handlers.closeModal}
            checkboxhandler={handlers.checkBoxesHandler}
          />,
          document.getElementById("discardBoxes")!
        )}
    </div>
  );
};

export default Options;

{
  /* Upcoming features */
}
{
  /* <Option text="Upload Image">
          <BsImage />
        </Option> */
}
{
  /* <Option text="Remind me">
          <AiOutlineBell />
        </Option> */
}
{
  /* Upcoming features */
}
