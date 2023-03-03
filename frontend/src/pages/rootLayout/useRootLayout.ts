import { useState } from "react";
import { useOutsideHover } from "../../hooks/useOutsideHover";
import { useDispatch, useSelector } from "react-redux";
import { onDropBin } from "../../utils";
import { deleteNote } from "../../store/notesSlice";
import { IRootState } from "../../store/store";

export const useRootLayout = () => {
  const labels = useSelector((state: IRootState) => state.notes.labels);
  const [mouseOverTrash, setMouseOverTrash] = useState(false);
  const dispatch = useDispatch();
  const hoverOutsideTrash = useOutsideHover(() => setMouseOverTrash(false));
  const onDropHandler = async (e: React.DragEvent) => {
    await onDropBin(e, (id, pinned) => {
      dispatch(deleteNote({ id, pinned }));
    });
  };
  const state = {
    labels,
    values: { mouseOverTrash },
    actions: {
      setMouseOverTrash,
      onDropHandler,
    },
  };
  return {
    hoverOutsideTrash,
    state,
  };
};
