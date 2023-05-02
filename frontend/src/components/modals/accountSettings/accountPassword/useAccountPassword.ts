import { useEffect, useRef, useState } from "react";
import { PWD_REGEX } from "../../../../config";

export const useAccountPassword = () => {
  const existingPassword = "123";
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

  useEffect(() => {
    const correctCurrentPassword = existingPassword === currentPassword;
    setValidCurrentPassword(correctCurrentPassword);
    const validNewPassword = PWD_REGEX.test(newPassword);

    setValidNewPassword(validNewPassword);

    const match = newPassword === confirmNewPassword;

    console.log({ match });
    console.log({ newPassword, confirmNewPassword });
    setValidMAtch(match);

    const result = validNewPassword && match;

    console.log({ currentPassword });
    // console.log({ currentPassword && valid });

    setValidInputs(result && correctCurrentPassword);
  }, [newPassword, confirmNewPassword, currentPassword]);

  const onSumbitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const values = {
    validInputs,
    validMatch,
    validNewPassword,
    validCurrentPassword,
    newPassword,
    currentPassword,
    focusNewPassword,
    errRef,
    focusConfirmPassword,
    focusCurrentPassword,
  };

  const handlers = {
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    onSumbitHandler,
    setFocusNewPassword,
    setFocusConfirmPassword,
    setFocusCurrentPassword,
  };
  return { values, handlers };
};
