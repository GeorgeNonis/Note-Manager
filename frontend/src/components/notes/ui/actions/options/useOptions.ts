import { useState } from "react";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { deleteNoteHttp } from "../../../../../services";
import { deleteNote } from "../../../../../store/notesSlice";
import { useDispatch } from "react-redux/es/exports";
import { isThereError } from "../../../../../utils/utils";
import { OptionsProps } from "./interfaces";

export const useOptions = ({ id, pinned, styles }: OptionsProps) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const [displayPalette, setDisplayPalette] = useState<boolean>(false);
  const outsideOptions = useOutsideClick(() => setDisplay(false));
  const testing = (bl: boolean) => {
    if (displayPalette) {
      setDisplayPalette(!displayPalette);
    }
  };
  // const outsidePalette = useOutsideClick(() => setDisplayPalette(false));
  const outsidePalette = useOutsideClick(() => testing(displayPalette));

  const deleteHandler = async (e: React.MouseEvent<HTMLHeadElement>) => {
    e.stopPropagation();

    const response = await deleteNoteHttp(id, pinned);
    const sucessfullRequest = isThereError(response);
    console.log(sucessfullRequest);
    sucessfullRequest
      ? dispatch(deleteNote({ id, pinned }))
      : console.log(response[1]?.message);

    setDisplay(false);
  };

  const contentStyle =
    display || displayPalette
      ? `${styles.optionsContent} ${styles.visible}`
      : `${styles.optionsContent} `;

  const optionsStyle =
    display || displayPalette
      ? `${styles.style} ${styles.visible}`
      : `${styles.style} `;
  return {
    display,
    displayPalette,
    setDisplayPalette,
    setDisplay,
    outsideOptions,
    outsidePalette,
    deleteHandler,
    contentStyle,
    optionsStyle,
  };
};
