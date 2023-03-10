import { useDispatch } from "react-redux";
import { checkPinned, checkUnPinned } from "../../../../../store/notes-slice";
import { UseCheckBox } from "../interfaces";

export const useCheckBox = ({
  checked,
  pinned,
  noteId,
  boxid,
}: UseCheckBox) => {
  const dispatch = useDispatch();
  const checkHandler = async () => {
    dispatch(
      pinned
        ? checkPinned({ id: noteId, boxid, checked })
        : checkUnPinned({ id: noteId, boxid, checked })
    );
  };
  return {
    checkHandler,
  };
};
