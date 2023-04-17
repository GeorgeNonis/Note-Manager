import { useState } from "react";
import { useOutsideClick } from "../../../../../hooks";
import {
  deleteNoteHttp,
  copyNoteHttp,
  checkBoxesHandlerHttp,
} from "../../../../../services";
import {
  archiveNote,
  checkBoxes,
  copyNote,
  deleteNote,
  unarchiveNote,
} from "../../../../../store/notes-slice";
import {
  errorState,
  httpReqResLoading,
} from "../../../../../store/display-state-slice";
import { useDispatch } from "react-redux/es/exports";
import { isThereError } from "../../../../../utils";
import { UseOptionsProps } from "./interfaces";
import { CreateCheckBoxes } from "./utils";

export const useOptions = ({
  archive,
  note,
  pinned,
  styles,
  review,
}: UseOptionsProps) => {
  const dispatch = useDispatch();
  const [discardBoxes, setDiscardBoxes] = useState(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [displayPalette, setDisplayPalette] = useState<boolean>(false);
  const [displayAddLabel, setDisplayAddLabel] = useState<boolean>();
  const outsideOptions = useOutsideClick(() => {
    setDisplay(false);
    setDisplayAddLabel(false);
  });

  const copyNoteHandler = async (id: string, pinned: boolean) => {
    const sharedId = crypto.randomUUID();
    const response = await copyNoteHttp({
      noteId: id,
      pinned,
      archive,
      sharedId,
    });
    dispatch(httpReqResLoading());

    const sucessfullRequest = isThereError(response);
    // console.log(sucessfullRequest);
    if (sucessfullRequest) {
      dispatch(copyNote({ id, pinned, archive, sharedId }));
    } else {
      dispatch(errorState(response[1]?.message));
    }

    dispatch(httpReqResLoading());
    setDisplay(false);
  };

  const deleteHandler = async (e: React.MouseEvent<HTMLHeadElement>) => {
    e.stopPropagation();

    // const response = await deleteNoteHttp(note.id, pinned, archive!);
    // const sucessfullRequest = isThereError(response);

    // sucessfullRequest
    //   ? dispatch(deleteNote({ id: note.id, pinned, archive }))
    //   : dispatch(errorState(response[1]?.message));
    dispatch(deleteNote({ id: note.id, pinned, archive }));
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
    // console.log(e.currentTarget.id);
    setDiscardBoxes(false);
  };

  const closeModal = () => {
    setDiscardBoxes(false);
  };

  const checkBoxesHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const { uncheckednote } = CreateCheckBoxes({ note });
    if (e.currentTarget.id === "discard") {
      const response = await checkBoxesHandlerHttp({
        noteId: note.id,
        pinned,
        archive,
        uncheckednote,
      });
      const sucessfullRequest = isThereError(response);
      if (sucessfullRequest) {
        dispatch(checkBoxes({ id: note.id, pinned, archive }));
      } else {
        dispatch(errorState(response[1]?.message));
      }
      setDiscardBoxes(!discardBoxes);
    } else {
      if (note.createCheckboxes === true) {
        setDiscardBoxes(!discardBoxes);
      } else {
        const response = await checkBoxesHandlerHttp({
          noteId: note.id,
          pinned,
          archive,
          uncheckednote,
        });
        const sucessfullRequest = isThereError(response);
        sucessfullRequest
          ? dispatch(
              checkBoxes({ id: note.id, pinned, archive, uncheckednote })
            )
          : dispatch(errorState(response[1]?.message));
      }
    }
  };

  const archiveNoteHandler = () => {
    !archive
      ? dispatch(archiveNote({ id: note.id }))
      : dispatch(unarchiveNote({ id: note.id }));
  };

  const contentStyle =
    display || displayPalette || review
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
    archiveNoteHandler,
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
