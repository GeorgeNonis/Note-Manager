import { useState } from "react";
import { useOutsideClick } from "../../../../../hooks";
import { deleteNoteHttp } from "../../../../../services";
import { copyNote, deleteNote } from "../../../../../store/notesSlice";
import { useDispatch } from "react-redux/es/exports";
import { isThereError } from "../../../../../utils/utils";
import { OptionsProps } from "./interfaces";
import { copyNoteHttp } from "../../../../../services";

export const useOptions = ({ id, pinned, styles }: OptionsProps) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const [displayPalette, setDisplayPalette] = useState<boolean>(false);
  const [displayAddLabel, setDisplayAddLabel] = useState<boolean>();
  const outsideOptions = useOutsideClick(() => {
    setDisplay(false);
    setDisplayPalette(false);
    setDisplayAddLabel(false);
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

  const openDotOptions = () => {
    setDisplayAddLabel(false);
    setDisplay(!display);
  };

  const addLabelHandler = () => {
    setDisplayAddLabel(true);
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

  const state = {
    displayAddLabel,
    setDisplayAddLabel,
    display,
    displayPalette,
    setDisplayPalette,
    setDisplay,
  };

  const handlers = {
    deleteHandler,
    copyNoteHandler,
    addLabelHandler,
    openDotOptions,
  };
  const useStyles = {
    contentStyle,
    optionsStyle,
  };
  return {
    state,
    outsideOptions,
    useStyles,
    handlers,
  };
};
