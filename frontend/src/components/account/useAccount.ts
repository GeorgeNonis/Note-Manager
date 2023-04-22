import { useState } from "react";
import { useOutsideClick } from "../../hooks";

export const useAccount = () => {
  const [accountSettings, setAccountSettings] = useState(false);
  const OnclickOutside = useOutsideClick(() => setAccountSettings(false));

  return { accountSettings, setAccountSettings, OnclickOutside };
};
