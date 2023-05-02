import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PWD_REGEX, USER_REGEX } from "../../../../config";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [passwordHover, setPasswordHover] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [validInputs, setValidInputs] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
    setPasswordHover(!passwordHover);
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!emailFocus) return;
    const result = USER_REGEX.test(email);
    setEmailValid(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setPasswordValid(result);

    setValidInputs(emailValid && result);
  }, [password, email]);

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      errRef.current?.focus();
      setErrorMsg("Invalid Entry");
      return;
    }

    navigate("/notes");
  };

  const state = {
    values: {
      loginForm,
      validInputs,
      errRef,
      validMatch,
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
        passwordHover,
        showPassword,
      },
    },
    handlers: {
      setPasswordHover,
      setShowPassword,
      showPasswordHandler,
      setValidInputs,
      setLoginForm,
      handleSumbit,
      emailHandlers: {
        setEmail,
        setEmailFocus,
        setEmailValid,
      },
      passwordHandlers: {
        setPasswordFocus,
        setPassword,
        setPasswordValid,
      },
    },
  };

  return { ...state };
};
