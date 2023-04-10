import { Dispatch } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TbCircleX, TbCircleCheck } from "react-icons/tb";
import styles from "./styles.module.scss";
import { useLoginForm } from "./useLoginForm";
import { Link } from "react-router-dom";

const LoginForm = ({
  setShowLoginForm,
}: {
  setShowLoginForm: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handlers, values } = useLoginForm();
  const { passwordHover, showPassword } = values.passwordValues;
  const {
    setPasswordHover,
    showPasswordHandler,
    emailHandlers,
    passwordHandlers,
  } = handlers;
  return (
    <form className={styles.form}>
      <fieldset>
        <legend>
          E-Mail:
          {/* <span
            className={
              values.emailValues.emailValid ? styles.show : styles.hide
            }
          >
            <TbCircleCheck className={styles.correct} />
          </span>
          <span
            className={
              values.emailValues.email && !values.emailValues.emailValid
                ? styles.show
                : styles.hide
            }
          >
            <TbCircleX className={styles.xmark} />
          </span> */}
        </legend>
        <input
          className={styles.formEmailInput}
          onChange={(e) => emailHandlers.setEmail(e.target.value)}
          onFocus={() => emailHandlers.setEmailFocus(true)}
          onBlur={() => emailHandlers.setEmailFocus(false)}
          type="email"
          id="email"
          name="email"
          ref={values.emailValues.emailRef}
        />
      </fieldset>
      <fieldset>
        <legend>
          Password:
          {/* <span
            className={
              values.passwordValues.passwordValid ? styles.show : styles.hide
            }
          >
            <TbCircleCheck className={styles.correct} />
          </span>
          <span
            className={
              values.passwordValues.password &&
              !values.passwordValues.passwordValid
                ? styles.show
                : styles.hide
            }
          >
            <TbCircleX className={styles.xmark} />
          </span> */}
        </legend>
        <div className={styles.inputwrapper}>
          <input
            onChange={(e) => passwordHandlers.setPassword(e.target.value)}
            onFocus={() => passwordHandlers.setPasswordFocus(true)}
            onBlur={() => passwordHandlers.setPasswordFocus(false)}
            type={showPassword ? "password" : "text"}
            id="password"
            name="password"
          />
          <span
            onClick={showPasswordHandler}
            onMouseEnter={() => setPasswordHover(!passwordHover)}
            onMouseLeave={() => setPasswordHover(!passwordHover)}
          >
            {passwordHover || showPassword ? (
              <AiFillEye />
            ) : (
              <AiFillEyeInvisible />
            )}
          </span>
        </div>
      </fieldset>
      <Link to={"/notes"}>
        <button
          className={styles.formLoginButton}
          disabled={
            !values.emailValues.emailValid ||
            !values.passwordValues.passwordValid
          }
          style={{ cursor: !values.validInputs ? "not-allowed" : "pointer" }}
        >
          Login
        </button>
      </Link>
      <div className={styles.crossLine}>
        <div></div>
        <span>OR</span>
        <div></div>
      </div>
      <button
        className={styles.formSignUpButton}
        onClick={() => setShowLoginForm(false)}
      >
        Sign Up
      </button>
    </form>
  );
};
export default LoginForm;
