import { Dispatch, SetStateAction, useState } from "react";
import { useOutsideHover } from "../../../hooks";
import { useDispatch } from "react-redux";
import {
  formSwitch,
  openAccountSettings,
} from "../../../store/display-state-slice";
import { useNavigate } from "react-router-dom";
import { useLogoutHandler } from "../../../hooks/useLogoutHandler";

interface useAccountOptionsProps {
  openAccountModal: Dispatch<SetStateAction<boolean>>;
}

export const useAccountOptions = ({
  openAccountModal,
}: useAccountOptionsProps) => {
  const { logoutHandler } = useLogoutHandler();
  const [showModal, setShowModal] = useState(false);
  const [changePicutre, setChangePicture] = useState(false);
  const hoverOutsideImage = useOutsideHover(() => setChangePicture(false));
  const dispatch = useDispatch();

  const accountSettingsHandler = () => {
    dispatch(openAccountSettings());
    openAccountModal(false);
  };

  const state = {
    handlers: {
      setChangePicture,
      setShowModal,
      accountSettingsHandler,
      logoutHandler,
    },
    values: {
      changePicutre,
      hoverOutsideImage,
      showModal,
    },
  };

  return { ...state };
};
