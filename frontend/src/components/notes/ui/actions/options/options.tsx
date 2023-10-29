import { Transition } from "react-transition-group";
import ReactDOM from "react-dom";
import { IoMdColorPalette } from "react-icons/io";
import { BiArchiveOut, BiArchiveIn, BiDotsHorizontal } from "react-icons/bi";
import { OptionsProps } from "./interfaces";
import { useOptions } from "./useOptions";
import Option from "./option";
import AddLabel from "../add-label";
import DiscardBoxes from "../../../../modals/discard-boxes";
import BackgroundImage from "../backgroundimage/backgroundImage";
import {
  StyledDotedOptions,
  StyledOptions,
  StyledOptionsContent,
} from "../../styles";

const Options = ({ note, pinned, archived = false }: OptionsProps) => {
  const { checkbox, id } = note;
  const { handlers, outsideOptions, state } = useOptions({
    archived,
    note,
    pinned,
  });

  const dotteOptions = state.display && (
    <StyledDotedOptions>
      <h3 onClick={handlers.deleteHandler} role={"button"}>
        Delete
      </h3>
      {!archived && (
        <h3 onClick={() => handlers.addLabelHandler()}>Add Label</h3>
      )}
      <h3 onClick={() => handlers.copyNoteHandler(id, pinned)}>Make a Copy</h3>
      <h3 onClick={(e) => handlers.checkBoxesHandler(e)}>
        {!checkbox ? "Create checkboxes" : "Discard checkboxes"}
      </h3>
    </StyledDotedOptions>
  );

  const addLabel = state.displayAddLabel && (
    <AddLabel id={id} pinned={pinned} archived={archived} />
  );

  return (
    <>
      <BackgroundImage
        open={state.displayPalette}
        archived={archived}
        setDisplayPalette={state.setDisplayPalette}
        id={id}
        pinned={pinned}
      />
      <StyledOptionsContent
        onClick={(e) => e.stopPropagation()}
        ref={outsideOptions}
      >
        <StyledOptions autoFlow={"column"} centerItems={"true"}>
          <Option
            text="Background Options"
            onClick={() => state.setDisplayPalette(!state.displayPalette)}
          >
            <IoMdColorPalette />
          </Option>
          <Option
            text={!archived ? "Archive Note" : "Unarchive Note"}
            onClick={() => state.archiveNoteHandler()}
          >
            {archived ? <BiArchiveOut /> : <BiArchiveIn />}
          </Option>

          <Option text="More Tools" onClick={handlers.openDotOptions}>
            <BiDotsHorizontal />
          </Option>
        </StyledOptions>
        {addLabel}
        {dotteOptions}
        <Transition
          in={state.discardBoxes}
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          {(transState) =>
            ReactDOM.createPortal(
              <DiscardBoxes
                transitionState={transState}
                closeModal={handlers.closeModal}
                checkboxhandler={handlers.checkBoxesHandler}
              />,
              document.getElementById("discardBoxes")!
            )
          }
        </Transition>
      </StyledOptionsContent>
    </>
  );
};

export default Options;
