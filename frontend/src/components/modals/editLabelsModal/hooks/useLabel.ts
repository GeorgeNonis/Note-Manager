import { useState } from "react";
import { useOutsideHover } from "../../../../hooks";

export const useLabel = () => {
  const [mouseOverLabel, setMouseOverLabel] = useState(false);
  const hoverOutsideLabel = useOutsideHover(() => setMouseOverLabel(false));
  const [edit, setEdit] = useState(false);

  const state = {
    values: {
      mouseOverLabel,
      edit,
      hoverOutsideLabel,
    },
    actions: {
      setMouseOverLabel,
      setEdit,
    },
  };
  return {
    state,
  };
};
