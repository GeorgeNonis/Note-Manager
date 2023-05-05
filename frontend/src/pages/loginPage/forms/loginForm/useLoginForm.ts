import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PWD_REGEX, USER_REGEX } from "../../../../config";
import { getUserHttp } from "../../../../services";
import { isThereError } from "../../../../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/display-state-slice";
import { initial } from "../../../../store/notes-slice";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      errRef.current?.focus();
      setErrorMsg("Invalid Entry");
      return;
    }

    const response = await getUserHttp({ email, pwd: password });
    console.log({ response });
    const successRequest = isThereError(response);
    if (successRequest) {
      dispatch(setUser(email));
      console.log("Sucess");
      console.log(response[0]);
      navigate("/notes");
    } else {
      console.log(response[1]?.message);
    }
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
