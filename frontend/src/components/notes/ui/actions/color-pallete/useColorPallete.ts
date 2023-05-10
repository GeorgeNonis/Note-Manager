import { useDispatch } from "react-redux";
import { updateNoteColorHttp } from "../../../../../services";
import { errorState } from "../../../../../store/display-state-slice";
import { setColor } from "../../../../../store/notes-slice";
import { isThereError } from "../../../../../utils/utils";
import { ColorPalleteProps } from "./interfaces";
import { colorGenerator } from "./utils";

export const useColorPallete = ({
  setDisplayPalette,
  id,
  pinned,
}: ColorPalleteProps) => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("auth-token")!;

  const displayHandler = async (value: string) => {
    // const response = await updateNoteColorHttp(value, id, pinned, token);

    // const sucessfullRequest = isThereError(response);
    // sucessfullRequest && dispatch(setColor({ value, id, pinned }));
    // : dispatch(errorState(response[1]?.message));

    setDisplayPalette(false);
  };

  const colors = [
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
  ];
  return { displayHandler, colors };
};
