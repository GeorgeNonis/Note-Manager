import { useState } from "react";
import { DEFAULT_AVTR, USER_AVATAR } from "../../../../config";

export const useAccountAvatar = () => {
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [hoverOnAvatar, setHoverOnAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVTR);
  const [userAvatar, setUserAvatar] = useState(USER_AVATAR);
  const [saveAvatar, setSaveAvatar] = useState(false);
  const [twikZindex, setTwikZinedx] = useState(false);

  console.log(`DEFAULT_AVTR ${DEFAULT_AVTR}`);

  const default_avatar = selectedAvatar === DEFAULT_AVTR;
  console.log(default_avatar);
  // console.log(def);

  const selectAvatarHandler = (avatar: string) => {
    setSelectedAvatar(avatar);
    setChangeAvatar(false);
  };

  const setChangeAvatarHandler = () => {
    setChangeAvatar(true);
    setSaveAvatar(false);
  };

  const saveAvatarHandler = () => {
    console.log("clicking");
    setSaveAvatar(true);
    setTwikZinedx(true);
    setTimeout(() => {
      setUserAvatar(selectedAvatar);
      setTwikZinedx(false);
      console.log(`after 500ms`);
      setTimeout(() => {
        setSelectedAvatar(DEFAULT_AVTR);
      }, 250);
    }, 500);
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
