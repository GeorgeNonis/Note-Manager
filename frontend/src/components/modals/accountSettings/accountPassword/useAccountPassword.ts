import { useEffect, useRef, useState } from "react";
import { PWD_REGEX } from "../../../../config";
import {
  checkPasswordValidity,
  newPasswordHttp,
} from "../../../../services/postNote";
import { InitialState } from "../../../../store/interfaces";
import { isThereError } from "../../../../utils";

interface UseAccountPasswordProps {
  initialState: InitialState;
}

export const useAccountPassword = ({
  initialState,
}: UseAccountPasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [focusCurrentPassword, setFocusCurrentPassword] = useState(false);
  const [validCurrentPassword, setValidCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [focusNewPassword, setFocusNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [validMatch, setValidMAtch] = useState(false);
  const [validInputs, setValidInputs] = useState(false);

  const errRef = useRef<HTMLParagraphElement>(null);
  const token = sessionStorage.getItem("auth-token") as string;
  const checkPassword = async () => {
    const res = await checkPasswordValidity({
      password: currentPassword,
      token,
    });
    setValidCurrentPassword(res[0]?.data.match);
  };

  const onSumbithandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const v1 = PWD_REGEX.test(newPassword);
    if (!v1 || !validCurrentPassword) {
      return;
    }
    const response = await newPasswordHttp(newPassword, token);
    const successRequest = isThereError(response);
    if (successRequest) {
    }
    setCurrentPassword("");
    setConfirmNewPassword("");
    setNewPassword("");
    setValidInputs(false);
  };

  useEffect(() => {
    if (currentPassword.length === 0) return;
    const timer = setTimeout(() => {
      checkPassword();
    }, 250);
    return () => {
      clearInterval(timer);
    };
  }, [currentPassword]);

  useEffect(() => {
    const validNewPassword = PWD_REGEX.test(newPassword);

    setValidNewPassword(validNewPassword);

    const match = newPassword === confirmNewPassword;

    setValidMAtch(match);

    const result = validNewPassword && match;

    setValidInputs(result && validCurrentPassword);
  }, [newPassword, confirmNewPassword, currentPassword]);

  const values = {
    validInputs,
    validMatch,
    validNewPassword,
    validCurrentPassword,
    currentPassword,
    newPassword,
    confirmNewPassword,
    focusNewPassword,
    errRef,
    focusConfirmPassword,
    focusCurrentPassword,
  };

  const handlers = {
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    setFocusNewPassword,
    setFocusConfirmPassword,
    setFocusCurrentPassword,
    onSumbithandler,
  };
  return { values, handlers };
};
