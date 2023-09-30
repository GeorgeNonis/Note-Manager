import { Dispatch, SetStateAction } from "react";

export interface ReviewModalProps {
  setReview?: Dispatch<SetStateAction<boolean>>;
  transitionState?: string;
}
