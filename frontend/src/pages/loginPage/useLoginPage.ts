import { useEffect, useRef, useState } from "react";

export const useLoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  return { showLoginForm, setShowLoginForm };
};
