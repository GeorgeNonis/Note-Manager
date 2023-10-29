import ReactDOM from "react-dom";
import { DeleteLabelConfigModal, Input } from "../../index";
import { LabelProps } from "./interfaces";
import { useLabel } from "./hooks";
import Svg from "./components/svg";
import {
  StyledLabel,
  StyledLabelsDiv,
  StyledPencil,
  StyledTick,
  StyledTrashBin,
} from "./editLabelsModal.styles";

const Label = ({ label }: LabelProps) => {
  const { state } = useLabel(label);

  return (
    <>
      {state.values.deleteConfig &&
        ReactDOM.createPortal(
          <DeleteLabelConfigModal state={state} />,
          document.getElementById("editLabelsModal")!
        )}

      <StyledLabelsDiv
        autoFlow={"column"}
        ref={state.values.hoverOutsideLabel}
        key={label}
        onMouseEnter={() =>
          state.actions.setMouseOverLabel(!state.values.mouseOverLabel)
        }
      >
        <Svg
          cond={!state.values.mouseOverLabel}
          First={StyledLabel}
          Second={StyledTrashBin}
          onClick={() => state.actions.setDeleteConfig(true)}
        />
        <Input
          css={{ all: "unset" }}
          onClick={() => state.actions.setEdit(true)}
          onChange={(e) => {
            state.actions.setNewLabel(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            state.actions.onEditHandler();
          }}
          ref={state.values.inputRef}
          type="text"
          name={label}
          id={label}
          defaultValue={label}
        />
        <Svg
          cond={state.values.edit}
          First={StyledPencil}
          Second={StyledTick}
          onClick={state.actions.onEditHandler}
        />
      </StyledLabelsDiv>
    </>
  );
};
export default Label;
