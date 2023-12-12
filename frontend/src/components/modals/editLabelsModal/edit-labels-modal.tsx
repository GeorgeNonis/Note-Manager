import { LabelModalProps } from "./interfaces";
import { useEditLabelsModal } from "./hooks";
import Label from "./label";
import {
  StyledButton,
  StyledLabelsDiv,
  StyledPlus,
  StyledTick,
  StyledXMark,
} from "./editLabelsModal.styles";
import {
  StyledBackdrop,
  StyledModal,
} from "../../Molecules/Modal/modal.styles";
import { Input, Text } from "../../Atoms";
// import { Grid } from "../../Molecules";
import { Grid } from "noniscomponents";

import Svg from "./components/svg";

const EditLabelsModal = ({
  labelModalHandler,
  modalState,
}: LabelModalProps) => {
  const { state } = useEditLabelsModal();

  return (
    <>
      <StyledBackdrop onClick={labelModalHandler} isOpen={modalState} />
      <StyledModal css={{ zIndex: 600 }}>
        <Grid css={{ padding: "$2" }}>
          <Text>Edit labels</Text>
          <StyledLabelsDiv autoFlow={"column"}>
            <Svg
              First={StyledXMark}
              Second={StyledPlus}
              cond={!state.values.createLabel}
              onClick={state.actions.createLabelHandler}
              id="x&plus"
            />
            <Input
              css={{ all: "unset" }}
              ref={state.values.newLabelRef}
              type="text"
              placeholder="Create new label"
              value={state.values.label}
              onChange={(e) => state.actions.setLabel(e.target.value)}
              onClick={state.actions.onClickCreateLabelInputHandler}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                state.actions.createLabelHandler(e);
              }}
            />
            <Svg
              cond={!state.values.createLabel}
              First={StyledTick}
              onClick={state.actions.createLabelHandler}
            />
          </StyledLabelsDiv>
          {state.values.labels.map((l) => {
            return <Label label={l.label} key={l.label} state={state} />;
          })}
        </Grid>
        <StyledButton variant={"reset"} onClick={labelModalHandler}>
          Done
        </StyledButton>
      </StyledModal>
    </>
  );
};

export default EditLabelsModal;
