import { LabelModalProps } from "./interfaces";
import { useEditLabelsModal } from "./hooks";
import Label from "./label";
import styles from "./style.module.scss";
import { StyledButton, StyledLabelsDiv } from "./editLabelsModal.styles";
import {
  StyledBackdrop,
  StyledModal,
} from "../../Molecules/Modal/modal.styles";
import { Input, Text } from "../../Atoms";
import { Grid } from "../../Molecules";

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
            <div
              id="x&plus"
              className={!state.values.createLabel ? styles.xmark : styles.plus}
              onClick={(e) => state.actions.createLabelHandler(e)}
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
            <div
              className={!state.values.createLabel ? styles.tick : undefined}
              onClick={(e) => state.actions.createLabelHandler(e)}
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
