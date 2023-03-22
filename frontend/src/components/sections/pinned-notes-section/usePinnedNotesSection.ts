import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDnd } from "../../../hooks/useDnD";
import { initial, sortNotes } from "../../../store/notes-slice";
import { IRootState } from "../../../store/store";
import { NoteObj } from "../../../interfaces/interfaces";
import { DragEndUtil, IfNetworkDown, isThereError } from "../../../utils/utils";
import {
  errorState,
  loadingInitialState,
} from "../../../store/display-state-slice";
import { getNotesHttp } from "../../../services";

export const usePinnedNotesSection = () => {
  const state = useSelector((state: IRootState) => state.notes);
  const { onDragEnter, onDragStart, index, indexOf } = useDnd();
  const dispatch = useDispatch();

  /**
   * Hook to detect outside click from the note's div
   * so you can close it
   */
  const onDragEnd = async () => {
    // console.log("Draggin");
    const cb = (arr: Iterable<NoteObj>[]) => {
      if (!Array.isArray(arr)) {
        dispatch(errorState(arr));
      }
      dispatch(sortNotes({ arr, pinned: true }));
      // console.log(state.notes);
    };
    await DragEndUtil({ state, index, indexOf, cb, pinned: true });
  };

  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await getNotesHttp();
  //     // console.log(response);

  //     const sucessfullRequest = isThereError(response);
  //     if (sucessfullRequest) {
  //       dispatch(initial(response[0]));
  //       // console.log("Sucessfull");
  //     } else {
  //       const msg = response[1]?.message!;
  //       // console.log("UN-Sucessfull");
  //       // console.log(msg);

  //       dispatch(errorState(IfNetworkDown(msg)));
  //     }

  //     dispatch(loadingInitialState(false));
  //   };
  //   fetch();
  // }, []);

  return {
    onDragEnter,
    onDragStart,
    onDragEnd,
  };
};
