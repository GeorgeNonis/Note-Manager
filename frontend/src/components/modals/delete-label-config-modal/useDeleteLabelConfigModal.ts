import { Dispatch } from "react";
import { useEffect } from "react";

export const useDeleteLabelConfigModal = (
  cb: Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cb(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
};
