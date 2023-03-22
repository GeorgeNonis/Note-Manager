import { IRootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotesHttp } from "../../../services";
import { IfNetworkDown, isThereError } from "../../../utils";
import { initial } from "../../../store/notes-slice";
import {
  errorState,
  loadingInitialState as LoadInitialData,
} from "../../../store/display-state-slice";

export const useDeletedNotesSection = () => {
  const notesState = useSelector((state: IRootState) => state.notes);
  const dispatch = useDispatch();
  const { error, loadingInitialState } = useSelector(
    (state: IRootState) => state.displayState
  );

  useEffect(() => {
    const fetch = async () => {
      const response = await getNotesHttp();
      // console.log(response);

      const sucessfullRequest = isThereError(response);
      if (sucessfullRequest) {
        dispatch(initial(response[0]));
        // console.log("Sucessfull");
      } else {
        const msg = response[1]?.message!;
        // console.log("UN-Sucessfull");
        // console.log(msg);

        dispatch(errorState(IfNetworkDown(msg)));
      }

      dispatch(LoadInitialData(false));
    };
    fetch();
  }, []);

  const state = {
    notes: notesState,
    displayState: {
      error,
      loadingInitialState,
    },
  };
  return { state };
};
