import { useDispatch } from "react-redux";
import { updateNoteColorHttp } from "../../../../../services";
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

  const displayHandler = async (value: string) => {
    const response = await updateNoteColorHttp(value, id, pinned);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(setColor({ value, id, pinned }))
      : console.log(response[1]?.message);

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
