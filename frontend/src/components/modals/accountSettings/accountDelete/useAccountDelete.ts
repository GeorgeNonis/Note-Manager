import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAccountDelete = () => {
  const [confirmEmail, setConfirmEmail] = useState(``);
  const [validMatch, setValidMatch] = useState(false);

  const navigate = useNavigate();

  const deleteAccountHandler = () => {
    navigate("/");
  };

  const email = `georgenonis@gmail.com`;

  useEffect(() => {
    const doesItMatch = confirmEmail === email;
    setValidMatch(doesItMatch);
  }, [confirmEmail]);

  return { validMatch, setConfirmEmail, deleteAccountHandler };
};
