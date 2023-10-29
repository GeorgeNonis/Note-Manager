import { Dispatch } from "react";
export interface BackgroundImageProps {
  setDisplayPalette: Dispatch<React.SetStateAction<boolean>>;
  id: string;
  pinned: boolean;
  archived?: boolean;
  open: boolean;
}

export interface useBackgroundimageProps
  extends Omit<BackgroundImageProps, "open"> {}
