import { Dispatch, SetStateAction, useState } from "react";
import { useOutsideHover } from "../../../hooks";
import { useDispatch } from "react-redux";
import { openAccountSettings } from "../../../store/display-state-slice";

interface useAccountOptionsProps {
  openAccountModal: Dispatch<SetStateAction<boolean>>;
}

export const useAccountOptions = ({
  openAccountModal,
}: useAccountOptionsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [changePicutre, setChangePicture] = useState(false);
  const hoverOutsideImage = useOutsideHover(() => setChangePicture(false));
  const dispatch = useDispatch();

  const accountSettingsHandler = () => {
    console.log("clicking");
    dispatch(openAccountSettings());
    openAccountModal(false);
    console.log(showModal);
  };

  const state = {
    handlers: {
      setChangePicture,
      setShowModal,
      accountSettingsHandler,
    },
    values: {
      changePicutre,
      hoverOutsideImage,
      showModal,
    },
  };

  return { ...state };
};
