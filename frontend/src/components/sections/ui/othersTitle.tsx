import { InitialState } from "../../../store/notesSlice";

interface Props {
  state: InitialState;
}
const OthersTitle = ({ state }: Props) => {
  return (
    <>
      {state.pinnedNotes.length > 0 && (
        <p>{state.notes.length !== 0 && "Others"}</p>
      )}
    </>
  );
};
export default OthersTitle;
