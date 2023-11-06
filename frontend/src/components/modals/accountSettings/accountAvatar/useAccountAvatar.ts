import { useState } from "react";
import { DEFAULT_AVTR, URL_REGEX, USER_AVATAR } from "../../../../config";
import { InitialState } from "../../../../store/interfaces";
import { useDispatch } from "react-redux";
import { changeAvatarProfile } from "../../../../store/notes-slice";
import { convertImageToBase64, isThereError } from "../../../../utils/utils";
import { changeAvatarPictureHttp } from "../../../../services";
import { fetchingDataHandler } from "../../../../store/display-state-slice";

export const useAccountAvatar = (initialState: InitialState) => {
  const dispatch = useDispatch();
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [hoverOnAvatar, setHoverOnAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | Blob>(
    DEFAULT_AVTR
  );
  const [userAvatar, setUserAvatar] = useState(initialState.image);
  const [saveAvatar, setSaveAvatar] = useState(false);
  const [twikZindex, setTwikZinedx] = useState(false);

  const default_avatar = selectedAvatar === DEFAULT_AVTR;

  const selectAvatarHandler = (avatar: string | File) => {
    if (!URL_REGEX.test(avatar as string)) {
      const fileReader = new FileReader();

      let base64: string | ArrayBuffer | null = "";
      fileReader.addEventListener("load", () => {
        const srcData = fileReader.result;

        setSelectedAvatar(srcData as string);
      });
      fileReader.readAsDataURL(avatar as Blob);
    } else {
      convertImageToBase64(avatar as string, (avatar) => {
        setSelectedAvatar(avatar as string);
      });
    }
    setChangeAvatar(false);
  };

  const setChangeAvatarHandler = () => {
    setChangeAvatar(true);
    setSaveAvatar(false);
  };

  const saveAvatarHandler = async () => {
    dispatch(fetchingDataHandler());
    const response = await changeAvatarPictureHttp({
      avatar: selectedAvatar as string,
    });
    const successfullRequest = isThereError(response);
    if (successfullRequest) {
      setSaveAvatar(true);
      setTwikZinedx(true);
      setTimeout(() => {
        dispatch(changeAvatarProfile(selectedAvatar));
        setTwikZinedx(false);
        setTimeout(() => {
          setSelectedAvatar(DEFAULT_AVTR);
        }, 250);
      }, 500);
    } else {
    }
    dispatch(fetchingDataHandler());
  };

  const values = {
    changeAvatar,
    hoverOnAvatar,
    selectedAvatar,
    default_avatar,
    saveAvatar,
    userAvatar,
    twikZindex,
  };

  const handlers = {
    setChangeAvatar,
    setHoverOnAvatar,
    setSelectedAvatar,
    selectAvatarHandler,
    saveAvatarHandler,
    setSaveAvatar,
    setUserAvatar,
    setChangeAvatarHandler,
  };

  return {
    values,
    handlers,
  };
};
