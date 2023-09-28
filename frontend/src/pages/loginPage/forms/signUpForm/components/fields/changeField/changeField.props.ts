export interface ChangeFieldProps {
  default_avatar: boolean;
  default_avatar_pic: string;
  avatar: string;
  requestState: boolean;
  setChangeAvatar: (arg: boolean) => void;
  setDefaultAvatar: (arg: boolean) => void;
}
