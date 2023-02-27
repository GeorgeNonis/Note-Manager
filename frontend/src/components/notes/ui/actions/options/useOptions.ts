import { useState } from "react";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { deleteNoteHttp } from "../../../../../api/api";
import { deleteNote } from "../../../../../store/notesSlice";
import { useDispatch } from "react-redux/es/exports";
import { isThereError } from "../../../../../utils/utils";
import { OptionsProps } from "./interfaces";

export const useOptions = ({ id, pinned }: OptionsProps) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const [displayPalette, setDisplayPalette] = useState<boolean>(false);
  const outsideOptions = useOutsideClick(() => setDisplay(false));
  const outsidePalette = useOutsideClick(() => setDisplayPalette(false));

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

  return {
    display,
    displayPalette,
    setDisplayPalette,
    setDisplay,
    outsideOptions,
    outsidePalette,
    deleteHandler,
  };
};
