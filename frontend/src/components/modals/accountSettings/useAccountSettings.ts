import { useState } from "react";

export const useAccountSettings = () => {
  const [showDetails, setShowDetails] = useState(false);

  const values = {
    showDetails,
  };

  const handlers = {
    setShowDetails,
  };
  return { ...values, ...handlers };
};
