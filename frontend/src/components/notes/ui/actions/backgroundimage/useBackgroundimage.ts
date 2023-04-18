import { useDispatch } from "react-redux";
import { updateNoteColorHttp } from "../../../../../services";
import { errorState } from "../../../../../store/display-state-slice";
import { setColor } from "../../../../../store/notes-slice";
import { isThereError } from "../../../../../utils/utils";
import { useBackgroundimageProps } from "./interfaces";
import { mobileVersion } from "../../../../../config";

export const useBackgroundimage = ({
  setDisplayPalette,
  id,
  pinned,
  archived,
}: useBackgroundimageProps) => {
  const dispatch = useDispatch();

  const displayHandler = async (value: string) => {
    const response = await updateNoteColorHttp(value, id, pinned, archived);
    console.log(`${value} clicking`);
    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(setColor({ value, id, pinned }))
      : dispatch(errorState(response[1]?.message));

    setDisplayPalette(false);
  };

  return { displayHandler, mobileVersion };
};
