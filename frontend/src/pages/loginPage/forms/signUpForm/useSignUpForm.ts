import { avatar_pictures } from "../../../../config";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignUpForm = () => {
  const navigate = useNavigate();
  const PWD_REGEX: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$/;
  const USER_REGEX: RegExp =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

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
  const [showPassword, setShowPassword] = useState(false);

  const [validInputs, setValidInputs] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [changeAvatar, setChangeAvatar] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [default_avatar, setDefaultAvatar] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
    setPasswordHover(!passwordHover);
    setConfirmPasswordHover(!confirmPasswordHover);
  };

  const avatarHandler = (avatar: string) => {
    setAvatar(avatar);
    setChangeAvatar(false);
    setDefaultAvatar(false);
  };

  useEffect(() => {
    emailRef.current?.focus();

    const avtr_pictures = avatar_pictures.map((pic) => {
      const img = new Image();
      img.src = pic;
      return img;
    });

    setAvatar(
      avtr_pictures[Math.floor(Math.random() * avtr_pictures.length)].src
    );
    console.log();
  }, []);

  useEffect(() => {
    if (!emailFocus) return;
    const result = USER_REGEX.test(email);
    setEmailValid(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setPasswordValid(result);
    const match = password === confirmPassword;
    setValidMatch(match);

    const validForm = emailValid && match;
    setValidInputs(validForm);
  }, [password, confirmPassword, email]);

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      errRef.current?.focus();
      setErrorMsg("Invalid Entry");
      return;
    }

    console.log("sumbiting");

    navigate("/notes");
  };

  const state = {
    values: {
      loginForm,
      validInputs,
      errRef,
      validMatch,
      changeAvatar,
      default_avatar,
      avatar,
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
        confirmPasswordHover,
        showPassword,
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
      setShowPassword,
      showPasswordHandler,
      setValidInputs,
      setLoginForm,
      handleSumbit,
      setChangeAvatar,
      setAvatar,
      setDefaultAvatar,
      avatarHandler,
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
      confirmPasswordHandlers: {
        setConfirmPassword,
        setConfirmPasswordFocus,
        setConfirmPasswordValid,
      },
    },
  };

  return { ...state };
};
