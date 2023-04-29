import { useState } from "react";

export const useAccountAvatar = () => {
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [hoverOnAvatar, setHoverOnAvatar] = useState(false);

  const values = { changeAvatar, hoverOnAvatar };

  const handlers = { setChangeAvatar, setHoverOnAvatar };

  return {
    ...values,
    ...handlers,
  };
};
