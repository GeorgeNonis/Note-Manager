import { Dispatch, SetStateAction } from "react";
export interface AvatarOptionsProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  avatarHandler: (avtr: string | File) => void;
}
