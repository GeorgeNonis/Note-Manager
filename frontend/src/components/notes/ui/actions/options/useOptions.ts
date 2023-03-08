import { useState } from "react";
import { useOutsideClick } from "../../../../../hooks";
import { deleteNoteHttp, copyNoteHttp } from "../../../../../services";
import {
  checkBoxesPinned,
  checkBoxesUnPinned,
  copyNote,
  deleteNote,
} from "../../../../../store/notesSlice";
import { useDispatch } from "react-redux/es/exports";
import { isThereError } from "../../../../../utils";
import { UseOptionsProps } from "./interfaces";

export const useOptions = ({ note, pinned, styles }: UseOptionsProps) => {
  const dispatch = useDispatch();
  const [discardBoxes, setDiscardBoxes] = useState(false);
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

    const response = await deleteNoteHttp(note.id, pinned);
    const sucessfullRequest = isThereError(response);
    console.log(sucessfullRequest);
    sucessfullRequest
      ? dispatch(deleteNote({ id: note.id, pinned }))
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

  const discardBoxesHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(e.currentTarget.id);
    setDiscardBoxes(false);
  };

  const closeModal = () => {
    setDiscardBoxes(false);
  };

  const checkBoxesHandler = async (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id === "discard") {
      dispatch(
        pinned
          ? checkBoxesPinned({ id: note.id })
          : checkBoxesUnPinned({ id: note.id })
      );
      setDiscardBoxes(!discardBoxes);
    } else {
      if (note.createCheckboxes === true) {
        setDiscardBoxes(!discardBoxes);
      } else {
        dispatch(
          pinned
            ? checkBoxesPinned({ id: note.id })
            : checkBoxesUnPinned({ id: note.id })
        );
      }
    }
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
    display,
    displayPalette,
    discardBoxes,
    setDiscardBoxes,
    setDisplayAddLabel,
    setDisplayPalette,
    setDisplay,
  };

  const handlers = {
    deleteHandler,
    copyNoteHandler,
    addLabelHandler,
    openDotOptions,
    checkBoxesHandler,
    discardBoxesHandler,
    closeModal,
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
