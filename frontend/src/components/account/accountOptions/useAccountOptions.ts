import { useState } from "react";
import { useOutsideHover } from "../../../hooks";

export const useAccountOptions = () => {
  const [changePicutre, setChangePicture] = useState(false);
  const hoverOutsideImage = useOutsideHover(() => setChangePicture(false));

  const state = {
    handlers: {
      setChangePicture,
    },
    values: {
      changePicutre,
      hoverOutsideImage,
    },
  };

  return { ...state };
};
