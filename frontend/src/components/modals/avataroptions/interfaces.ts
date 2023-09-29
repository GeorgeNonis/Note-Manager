import { Dispatch, SetStateAction } from "react";
export interface AvatarModalProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  avatarHandler: (avtr: string | File) => void;
  open: boolean;
}
