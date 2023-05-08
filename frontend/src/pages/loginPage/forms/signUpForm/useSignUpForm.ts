import {
  PWD_REGEX,
  URL_REGEX,
  USER_REGEX,
  avatar_pictures,
} from "../../../../config";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserHttp } from "../../../../services/postNote";
import { isThereError } from "../../../../utils";
import { getUsersHttp } from "../../../../services/getNote";
import { useDispatch } from "react-redux";
import { emailAlreadyInUseHandler } from "../../../../store/display-state-slice";
import { convertImageToBase64 } from "../../../../utils/utils";

export const useSignUpForm = () => {
  const token = sessionStorage.getItem("auth-token")!;
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const avatarHandler = (avatar: string | File) => {
    if (!URL_REGEX.test(avatar as string)) {
      const fileReader = new FileReader();

      let base64: string | ArrayBuffer | null = "";
      fileReader.addEventListener("load", () => {
        const srcData = fileReader.result;

        setAvatar(srcData as string);
      });
      fileReader.readAsDataURL(avatar as Blob);
    } else {
      convertImageToBase64(avatar as string, (avtr) => {
        setAvatar(avtr);
      });
    }

    setChangeAvatar(false);
    setDefaultAvatar(false);
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    const token = sessionStorage.getItem("auth-token")!;
    e.preventDefault();
    const v1 = USER_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      errRef.current?.focus();
      setErrorMsg("Invalid Entry");
      return;
    }

    const response = await createUserHttp(email, password, avatar, token);
    const successRequest = isThereError(response);
    if (successRequest) {
      const token = response[0]?.headers.authorization;
      sessionStorage.setItem("auth-token", token!);
      // dispatch(authorizedHandler(true));
      navigate("/notes");
    } else {
      console.log(response[1]?.message);
    }
  };

  const doesUserExists = async () => {
    const response = await getUsersHttp(email, token);

    dispatch(emailAlreadyInUseHandler(response[0]));
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

    const timeout = setTimeout(() => {
      doesUserExists();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setPasswordValid(result);
    const match = password === confirmPassword;
    setValidMatch(match);

    const validForm = emailValid && match;
    setValidInputs(validForm);
  }, [password, confirmPassword, email]);

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
