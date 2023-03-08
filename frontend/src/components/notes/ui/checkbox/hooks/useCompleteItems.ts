import { useState } from "react";

export const useCompleteItems = () => {
  const [state, setState] = useState(false);

  const showItemsHandler = () => {
    setState(!state);
  };

  return {
    state,
    showItemsHandler,
  };
};
