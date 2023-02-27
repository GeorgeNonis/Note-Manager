import { useState } from "react";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { deleteNoteHttp } from "../../../../../services";
import { copyNote, deleteNote } from "../../../../../store/notesSlice";
import { useDispatch } from "react-redux/es/exports";
import { isThereError } from "../../../../../utils/utils";
import { OptionsProps } from "./interfaces";
import { copyNoteHttp } from "../../../../../services/postNote";

export const useOptions = ({ id, pinned, styles }: OptionsProps) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const [displayPalette, setDisplayPalette] = useState<boolean>(false);
  const outsideOptions = useOutsideClick(() => {
    setDisplay(false);
    setDisplayPalette(false);
  });

  const copyNoteHandler = async (id: string, pinned: boolean) => {
    const sharedId = crypto.randomUUID();
    const response = await copyNoteHttp({ noteId: id, pinned, sharedId });

    const sucessfullRequest = isThereError(response);
    console.log(sucessfullRequest);
    sucessfullRequest
      ? dispatch(copyNote({ id, pinned, sharedId }))
      : console.log(response[1]?.message);

    setDisplay(false);
  };

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
    deleteHandler,
    contentStyle,
    optionsStyle,
    copyNoteHandler,
  };
};
