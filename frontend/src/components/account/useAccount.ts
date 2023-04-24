import { useState } from "react";
import { useOutsideClick } from "../../hooks";

export const useAccount = () => {
  const [accountSettings, setAccountSettings] = useState(false);
  const [changePicutre, setChangePicture] = useState(false);
  const OnclickOutside = useOutsideClick(() => setAccountSettings(false));

  const state = {
    handlers: {
      setChangePicture,
      setAccountSettings,
    },
    values: {
      changePicutre,
      accountSettings,
      OnclickOutside,
    },
  };

  return { ...state };
};
