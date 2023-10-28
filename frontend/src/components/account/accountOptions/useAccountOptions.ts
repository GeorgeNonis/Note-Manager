import { useDispatch } from "react-redux";
import { openAccountSettings } from "../../../store/display-state-slice";
import { useLogoutHandler } from "../../../hooks/useLogoutHandler";
import { UseAccountOptionsProps } from "./interfaces";

export const useAccountOptions = ({
  openAccountModal,
}: UseAccountOptionsProps) => {
  const { logoutHandler } = useLogoutHandler();

  const dispatch = useDispatch();

  const accountSettingsHandler = () => {
    dispatch(openAccountSettings());
    openAccountModal(false);
  };

  const state = {
    handlers: {
      accountSettingsHandler,
      logoutHandler,
    },
  };

  return { ...state };
};
