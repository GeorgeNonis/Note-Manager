import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeNoteHttp, restoreNoteHttp } from "../../../services";
import { isThereError } from "../../../utils";
import { removeNote, restoreNote } from "../../../store/notes-slice";

export const useDeletedNote = () => {
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [review, setReview] = useState<boolean>(false);
  const dispatch = useDispatch();

  const restoreProcess = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setRestoreLoading(true);
    const response = await restoreNoteHttp(id);
    setRestoreLoading(false);

    const successfulRequest = isThereError(response);
    successfulRequest && dispatch(restoreNote(id));
  };

  const removeProcess = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setRemoveLoading(true);
    const response = await removeNoteHttp(id);
    setRemoveLoading(false);

    const successfulRequest = isThereError(response);
    successfulRequest && dispatch(removeNote(id));
  };
  const handleExpand = () => {
    setReview(!review);
  };

  return {
    removeLoading,
    restoreLoading,
    review,
    handleExpand,
    restoreProcess,
    removeProcess,
  };
};
