import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkBoxHandlerHttp } from "../../../../../services";
import { errorState } from "../../../../../store/display-state-slice";
import { checkBox } from "../../../../../store/notes-slice";
import { isThereError } from "../../../../../utils";
import { UseCheckBox } from "../interfaces";

export const useCheckBox = ({
  checked,
  pinned,
  noteId,
  boxid,
  archived,
}: UseCheckBox) => {
  const token = sessionStorage.getItem("auth-token")!;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const checkHandler = async () => {
    setLoading(true);
    const response = await checkBoxHandlerHttp({
      noteId,
      boxid,
      checked,
      pinned,
      archived,
      token,
    });
    const sucessfullRequest = isThereError(response);
    if (sucessfullRequest) {
      dispatch(checkBox({ id: noteId, boxid, checked, pinned, archived }));
    } else {
    }
    setLoading(false);
  };
  return {
    checkHandler,
    loading,
  };
};
