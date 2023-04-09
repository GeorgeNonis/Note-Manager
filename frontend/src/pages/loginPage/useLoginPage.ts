import { useEffect, useRef, useState } from "react";

export const useLoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const [passwordHover, setPasswordHover] = useState(false);
  const [confirmPasswordHover, setConfirmPasswordHover] = useState(false);

  const state = {
    values: {
      passwordHover,
      confirmPasswordHover,
      emailValues: {
        email,
        emailFocus,
        emailValid,
        emailRef,
      },
      passwordValues: {
        password,
        passwordFocus,
        passwordValid,
      },
      confirmPasswordValues: {
        confirmPassword,
        confirmPasswordFocus,
        confirmPasswordValid,
      },
    },
    handlers: {
      setPasswordHover,
      setConfirmPasswordHover,
    },
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return { ...state };
};
