import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
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
  fetchingDataHandler,
  httpReqResLoading,
} from "../../../../../store/display-state-slice";
import { useDispatch } from "react-redux/es/exports";
import { isThereError } from "../../../../../utils";
import { UseOptionsProps } from "./interfaces";
import { CreateCheckBoxes } from "./utils";
import { archiveNoteHandlerHttp } from "../../../../../services/postNote";

export const useOptions = ({ archived, note, pinned }: UseOptionsProps) => {
  const dispatch = useDispatch();
  const [discardBoxes, setDiscardBoxes] = useState(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [displayPalette, setDisplayPalette] = useState<boolean>(false);
  const [displayAddLabel, setDisplayAddLabel] = useState<boolean>();
  const nodeRef = useRef(null);
  const outsideOptions = useOutsideClick(() => {
    setDisplay(false);
    setDisplayAddLabel(false);
  });

  const copyNoteHandler = async (id: string, pinned: boolean) => {
    const sharedId = uuidv4();
    const response = await copyNoteHttp({
      noteId: id,
      pinned,
      archived,
      sharedId,
    });
    dispatch(httpReqResLoading());

    const sucessfullRequest = isThereError(response);
    if (sucessfullRequest) {
      dispatch(copyNote({ id, pinned, archived, sharedId }));
    } else {
    }

    dispatch(httpReqResLoading());
    setDisplay(false);
  };

  const deleteHandler = async (e: React.MouseEvent<HTMLHeadElement>) => {
    dispatch(fetchingDataHandler());
    e.stopPropagation();
    console.log(note.id);
    const response = await deleteNoteHttp(note.id, pinned, archived!);
    const sucessfullRequest = isThereError(response);

    sucessfullRequest &&
      dispatch(deleteNote({ id: note.id, pinned, archived }));

    setDisplay(false);
    dispatch(fetchingDataHandler());
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
    setDiscardBoxes(false);
  };

  const closeModal = () => {
    setDiscardBoxes(false);
  };

  const checkBoxesHandler = async (e: React.MouseEvent<HTMLElement>) => {
    // dispatch(fetchingDataHandler());
    const { uncheckednote } = CreateCheckBoxes({ note });
    if (e.currentTarget.id === "discard") {
      const response = await checkBoxesHandlerHttp({
        noteId: note.id,
        pinned,
        archived,
        uncheckednote,
      });
      const sucessfullRequest = isThereError(response);
      if (sucessfullRequest) {
        dispatch(checkBoxes({ id: note.id, pinned, archived }));
      } else {
      }
      setDiscardBoxes(!discardBoxes);
    } else {
      if (note.createCheckboxes === true) {
        setDiscardBoxes(!discardBoxes);
      } else {
        if (note.note.length === 0) return;
        const response = await checkBoxesHandlerHttp({
          noteId: note.id,
          pinned,
          archived,
          uncheckednote,
        });
        const sucessfullRequest = isThereError(response);
        sucessfullRequest &&
          dispatch(
            checkBoxes({ id: note.id, pinned, archived, uncheckednote })
          );
      }
    }
    // dispatch(fetchingDataHandler());
  };

  const archiveNoteHandler = async () => {
    dispatch(fetchingDataHandler());
    const response = await archiveNoteHandlerHttp({
      noteId: note.id,
      pinned,
      archived,
    });

    const sucessfullRequest = isThereError(response);

    sucessfullRequest && !archived
      ? dispatch(archiveNote({ id: note.id, pinned }))
      : dispatch(unarchiveNote({ id: note.id }));
    dispatch(fetchingDataHandler());
  };

  const state = {
    displayAddLabel,
    display,
    displayPalette,
    discardBoxes,
    nodeRef,
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
  return {
    state,
    outsideOptions,
    handlers,
  };
};
