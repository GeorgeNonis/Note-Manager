import { useDispatch } from "react-redux";
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
