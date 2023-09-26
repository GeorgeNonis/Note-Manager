import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PWD_REGEX, USER_REGEX } from "../../../../config";
import { getUserHttp } from "../../../../services";
import { isThereError } from "../../../../utils";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

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

  const [validCredentials, setValidCredentials] = useState(false);
  const [userMsg, setUserMsg] = useState("Invalid Credentials");

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
    setPasswordHover(!passwordHover);
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUserMsg("Invalid Credentials");
    const token = sessionStorage.getItem("auth-token")!;
    setValidCredentials(false);
    e.preventDefault();
    const v1 = USER_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      errRef.current?.focus();

      return;
    }
    const response = await getUserHttp({ email, pwd: password, token });

    const successRequest = isThereError(response);
    if (response[0]?.data.msg) {
      // console.log(response[0]?.data.msg);
      setUserMsg(response[0]?.data.msg);
    }
    if (!response[0]?.data.match) return toast.error(userMsg);
    if (successRequest) {
      const token = response[0]?.headers.authorization;
      sessionStorage.setItem("auth-token", token!);
      return navigate("/notes");
    } else {
      // console.log(response[1]);
    }
  };

  const warningCredentialsStlye = [
    styles.invalidCredentials,
    !validCredentials ? styles.hideInvalidCredentials : null,
  ];

  useEffect(() => {
    if (!validCredentials) return;
    setTimeout(() => {
      setValidCredentials(false);
    }, 5000);
  }, [validCredentials]);

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

  const state = {
    emailField: {
      setEmail,
      setEmailFocus,
      setEmailValid,
      emailRef,
    },
    passwordField: {
      setPasswordFocus,
      setPassword,
      showPasswordHandler,
      passwordHover,
      showPassword,
    },
    loginButtonValues: {
      emailValid,
      passwordValid,
      validInputs,
    },
    values: {
      errRef,
      validCredentials,
      warningCredentialsStlye,
      userMsg,
      emailValues: {
        email,
        emailFocus,
      },
      passwordValues: {
        password,
        passwordFocus,
      },
    },
    handlers: {
      handleSumbit,
    },
  };

  return { ...state };
};
