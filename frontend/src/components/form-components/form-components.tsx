import { Button } from "../Atoms";
import Input from "./inputText";
import { FormProps } from "./interfaces";
import { StyledActions, StyledForm } from "./styles";

const Form = ({ useStore }: FormProps) => {
  const { display, clickOutsideNote, title, note } = useStore.values;
  const disableBtn = title.length == 0 && note.length == 0;
  return (
    <StyledForm ref={clickOutsideNote}>
      {display && (
        <Input
          onChange={useStore.actions.onChangeTitle}
          value={title}
          placeholder={"Title"}
        />
      )}
      <Input
        onChange={useStore.actions.onChangeNote!}
        placeholder={"Take a note..."}
        value={note!}
        onClick={() => {
          useStore.actions.setDisplay(true);
        }}
      />
      {display && (
        <StyledActions autoFlow={"column"}>
          <Button
            variant={"reset"}
            disabled={disableBtn}
            onClick={() => {
              useStore.actions.saveNote();
              useStore.actions.setDisplay(false);
            }}
          >
            Create Note
          </Button>
          <Button
            variant={"reset"}
            disabled={disableBtn}
            onClick={useStore.actions.clearInputs}
          >
            Clear Inputs
          </Button>

          <Button
            variant={"reset"}
            onClick={() => {
              useStore.actions.setDisplay(false);
            }}
          >
            Close
          </Button>
        </StyledActions>
      )}
    </StyledForm>
  );
};

export default Form;
