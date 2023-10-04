import { NoteDetailsProps } from "./interfaces";
import { Checkbox } from "../../index";
import CompleteItems from "./checkbox/complete-items";
import { StyledNoteDetails, StyledTextArea } from "./styles";

const NoteDetails = ({
  setNotedetails,
  note,
  noteValue,
  checkbox,
  pinned,
  editable = true,
  archived = false,
}: NoteDetailsProps) => {
  return (
    <>
      {!checkbox && (
        <StyledTextArea
          readOnly={editable}
          name="notedetails"
          id="notedetails"
          spellCheck="true"
          placeholder="Empty note"
          value={editable ? note.note : noteValue}
          onChange={(e) => {
            if (setNotedetails) {
              setNotedetails(e.target.value);
            }
          }}
        />
      )}
      {checkbox && (
        <StyledNoteDetails>
          {checkbox &&
            note.unChecked?.length! > 0 &&
            note.unChecked!.map((info) => {
              return (
                <Checkbox
                  archived={archived}
                  id={note.id}
                  checkBoxDetails={info}
                  checked={false}
                  key={info.id}
                  pinned={pinned!}
                />
              );
            })}
          {checkbox && note.checked?.length! > 0 && (
            <CompleteItems
              archived={archived}
              completedItems={note.checked!}
              id={note.id}
              pinned={pinned!}
            />
          )}
        </StyledNoteDetails>
      )}
    </>
  );
};

export default NoteDetails;
