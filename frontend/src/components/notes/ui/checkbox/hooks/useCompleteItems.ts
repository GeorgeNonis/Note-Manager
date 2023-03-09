import { useState } from "react";

export const useCompleteItems = () => {
  const [state, setState] = useState(true);

  const showItemsHandler = () => {
    setState(!state);
  };

  return {
    state,
    showItemsHandler,
  };
};
