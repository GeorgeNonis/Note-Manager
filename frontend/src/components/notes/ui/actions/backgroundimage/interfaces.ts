import { Dispatch } from "react";
export interface BackgroundImageProps {
  setDisplayPalette: Dispatch<React.SetStateAction<boolean>>;
  id: string;
  pinned: boolean;
}

export interface useBackgroundimageProps extends BackgroundImageProps {}
