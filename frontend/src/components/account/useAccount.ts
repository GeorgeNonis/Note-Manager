import { useState } from "react";
import { useOutsideClick } from "../../hooks";

export const useAccount = () => {
  const [accountSettings, setAccountSettings] = useState(false);
  const OnclickOutside = useOutsideClick(() => setAccountSettings(false));

  const accountSettingsHandler = () => {
    setAccountSettings(!accountSettings);
  };

  const state = {
    handlers: {
      accountSettingsHandler,
    },
    values: {
      accountSettings,
      OnclickOutside,
    },
  };

  return { ...state };
};
