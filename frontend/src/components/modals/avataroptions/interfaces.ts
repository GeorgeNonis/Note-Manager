import { Dispatch, SetStateAction } from "react";
export interface AvatarOptionsProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  avatar: Dispatch<SetStateAction<string>>;
}
