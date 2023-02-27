import { useDispatch } from "react-redux";
import { updateNoteColorHttp } from "../../../../../api/api";
import { setColor } from "../../../../../store/notesSlice";
import { isThereError } from "../../../../../utils/utils";
import { ColorPalleteProps } from "./interfaces";
import { colorGenerator } from "./utils";

export const useColorPallete = ({
  closePalette,
  id,
  pinned,
}: ColorPalleteProps) => {
  const dispatch = useDispatch();

  const displayHandler = async (value: string) => {
    closePalette(false);

    const response = await updateNoteColorHttp(value, id, pinned);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(setColor({ value, id, pinned }))
      : console.log(response[1]?.message);
  };

  const colors = [
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
  ];
  return { displayHandler, colors };
};
