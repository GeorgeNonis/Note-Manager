import { useState, useEffect } from "react";
import { deleteAccountHttp } from "../../../../services/delete";
import { isThereError } from "../../../../utils";
import { useLogoutHandler } from "../../../../hooks/useLogoutHandler";
import { toast } from "react-toastify";

export const useAccountDelete = ({ email }: { email: string }) => {
  const { logoutHandler } = useLogoutHandler();

  const [confirmEmail, setConfirmEmail] = useState(``);
  const [validMatch, setValidMatch] = useState(false);
  const token = sessionStorage.getItem("auth-token")!;

  const deleteAccountHandler = async () => {
    if (!validMatch) return;
    const response = await deleteAccountHttp(email, token);
    const successfullRequest = isThereError(response);
    if (successfullRequest) {
      toast.success("Account has been delete!");
      logoutHandler();
    }
  };

  useEffect(() => {
    const doesItMatch = confirmEmail === email;
    setValidMatch(doesItMatch);
  }, [confirmEmail]);

  return { validMatch, setConfirmEmail, deleteAccountHandler };
};
