import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccountHttp } from "../../../../services/delete";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";

export const useAccountDelete = ({ email }: { email: string }) => {
  const [confirmEmail, setConfirmEmail] = useState(``);
  const [validMatch, setValidMatch] = useState(false);

  const navigate = useNavigate();

  const deleteAccountHandler = async () => {
    const response = await deleteAccountHttp(email);
    navigate("/");
  };

  useEffect(() => {
    const doesItMatch = confirmEmail === email;
    setValidMatch(doesItMatch);
  }, [confirmEmail]);

  return { validMatch, setConfirmEmail, deleteAccountHandler };
};
