import { useEffect, useRef, useState } from "react";
import { PWD_REGEX } from "../../../../config";
import {
  checkPasswordValidity,
  newPasswordHttp,
} from "../../../../services/postNote";
import { isThereError } from "../../../../utils";

import { InputFieldProps } from "../../../Molecules/InputField";
import { toast } from "react-toastify";

export const useAccountPassword = () => {
  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [focusCurrentPassword, setFocusCurrentPassword] = useState(false);
  const [validCurrentPassword, setValidCurrentPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [focusNewPassword, setFocusNewPassword] = useState(false);

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [validInputs, setValidInputs] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const showCurrentPasswordHandler = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const showNewPasswordHandler = () => {
    setShowNewPassword(!showNewPassword);
  };

  const errRef = useRef<HTMLParagraphElement>(null);

  const checkPassword = async () => {
    setLoading(true);
    try {
      const res = await checkPasswordValidity({
        password: currentPassword,
      });
      setValidCurrentPassword(res[0]?.data.match);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const v1 = PWD_REGEX.test(newPassword);
    if (!v1 || !validCurrentPassword) {
      return;
    }
    const response = await newPasswordHttp(newPassword);
    const successRequest = isThereError(response);

    if (successRequest) {
      setCurrentPassword("");
      setConfirmNewPassword("");
      setNewPassword("");
      setValidInputs(false);
      toast.success("Password has been changed");
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
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

  const validatePasswords = () => {
    const isValidNew = PWD_REGEX.test(newPassword);
    const isMatch = newPassword === confirmNewPassword;

    setValidNewPassword(isValidNew);
    setValidMatch(isMatch);

    const allValid = isValidNew && isMatch && validCurrentPassword;
    setValidInputs(allValid);
  };

  useEffect(() => {
    validatePasswords();
  }, [newPassword, confirmNewPassword, validCurrentPassword]);

  const currentPasswordProps: InputFieldProps = {
    errRef,
    value: currentPassword,
    isFocused: focusCurrentPassword,
    isValid: !!(validCurrentPassword && currentPassword),
    isHovered: focusCurrentPassword,
    errorMessage: "You have to enter your Current Password!",
    legendText: "Current Password",
    backgroundUnset: true,
    showContent: showCurrentPassword,
    setFocused: setFocusCurrentPassword,
    setHovered: setFocusCurrentPassword,
    setValue: setCurrentPassword,
    toggleShowContent: showCurrentPasswordHandler,
  };

  const newPasswordProps: InputFieldProps = {
    errRef,
    value: newPassword,
    errorMessage: `Minimum eight characters, at least one uppercase letter, one
    lowercase letter, one number and one special character`,
    isValid: !!(validNewPassword && newPassword),
    isFocused: focusNewPassword,
    isHovered: focusNewPassword,
    backgroundUnset: true,
    legendText: "New Password",
    showContent: showNewPassword,
    setValue: setNewPassword,
    setFocused: setFocusNewPassword,
    setHovered: setFocusNewPassword,
    toggleShowContent: showNewPasswordHandler,
  };

  const confirmPasswordProps: InputFieldProps = {
    legendText: "Confirm Password",
    errRef,
    value: confirmNewPassword,
    errorMessage: ` Must match your New Password`,
    isValid: !!(validMatch && validNewPassword),
    isFocused: focusConfirmPassword,
    isHovered: focusConfirmPassword,
    backgroundUnset: true,
    showContent: showNewPassword,
    setValue: setConfirmNewPassword,
    setFocused: setFocusConfirmPassword,
    setHovered: setFocusConfirmPassword,
    toggleShowContent: showNewPasswordHandler,
  };

  return {
    loading,
    currentPasswordProps,
    newPasswordProps,
    confirmPasswordProps,
    validInputs,
    onSubmitHandler,
  };
};
