import { useDispatch } from "react-redux";
import { checkBoxHandlerHttp } from "../../../../../services";
import { checkBox } from "../../../../../store/notes-slice";
import { isThereError } from "../../../../../utils";
import { UseCheckBox } from "../interfaces";

export const useCheckBox = ({
  checked,
  pinned,
  noteId,
  boxid,
}: UseCheckBox) => {
  const dispatch = useDispatch();
  const checkHandler = async () => {
    const response = await checkBoxHandlerHttp({
      noteId,
      boxid,
      checked,
      pinned,
    });
    const sucessfullRequest = isThereError(response);
    console.log(sucessfullRequest);
    sucessfullRequest
      ? dispatch(checkBox({ id: noteId, boxid, checked, pinned }))
      : console.log(response[1]?.message);
  };
  return {
    checkHandler,
  };
};
