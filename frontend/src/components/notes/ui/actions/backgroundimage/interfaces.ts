import { Dispatch } from "react";
export interface BackgroundImageProps {
  setDisplayPalette: Dispatch<React.SetStateAction<boolean>>;
  id: string;
  transitionState: string;
  pinned: boolean;
  archived?: boolean;
}

export interface useBackgroundimageProps extends BackgroundImageProps {}
