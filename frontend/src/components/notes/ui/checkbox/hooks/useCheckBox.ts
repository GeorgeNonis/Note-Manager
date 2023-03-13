import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const checkHandler = async () => {
    setLoading(true);
    const response = await checkBoxHandlerHttp({
      noteId,
      boxid,
      checked,
      pinned,
    });
    const sucessfullRequest = isThereError(response);
    if (sucessfullRequest) {
      dispatch(checkBox({ id: noteId, boxid, checked, pinned }));
    } else {
      console.log(response[1]?.message);
    }
    setLoading(false);
  };
  return {
    checkHandler,
    loading,
  };
};
