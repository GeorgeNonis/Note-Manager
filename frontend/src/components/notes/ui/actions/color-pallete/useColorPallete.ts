import { ColorPalleteProps } from "./interfaces";
import { colorGenerator } from "./utils";

export const useColorPallete = ({ setDisplayPalette }: ColorPalleteProps) => {
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
