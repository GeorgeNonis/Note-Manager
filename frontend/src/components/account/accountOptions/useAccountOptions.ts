import { Dispatch, SetStateAction, useState } from "react";
import { useOutsideHover } from "../../../hooks";

interface useAccountOptionsProps {
  openAccountModal: Dispatch<SetStateAction<boolean>>;
}

export const useAccountOptions = ({
  openAccountModal,
}: useAccountOptionsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [changePicutre, setChangePicture] = useState(false);
  const hoverOutsideImage = useOutsideHover(() => setChangePicture(false));

  const accountSettingsHandler = () => {
    openAccountModal(false);
    setShowModal(true);
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
