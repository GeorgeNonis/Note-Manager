import { Dispatch } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TbCircleX, TbCircleCheck } from "react-icons/tb";
import { useSignUpForm } from "./useSignUpForm";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const SignUpForm = ({
  setShowLoginForm,
}: {
  setShowLoginForm: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handlers, values } = useSignUpForm();

  const { confirmPasswordHover, passwordHover, showPassword } =
    values.passwordValues;
  const {
    setPasswordHover,
    setConfirmPasswordHover,
    showPasswordHandler,
    emailHandlers,
    passwordHandlers,
    confirmPasswordHandlers,
    handleSumbit,
  } = handlers;

  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      <fieldset>
        <legend>
          E-Mail:
          <span
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
          </span>
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
          <span
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
          </span>
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
      <fieldset>
        <legend>
          Confirm Password:
          <span
            className={
              values.validMatch && values.passwordValues.passwordValid
                ? styles.show
                : styles.hide
            }
          >
            <TbCircleCheck className={styles.correct} />
          </span>
          <span
            className={
              !values.validMatch ||
              (values.confirmPasswordValues.confirmPassword.length &&
                !values.passwordValues.passwordValid)
                ? styles.show
                : styles.hide
            }
          >
            <TbCircleX className={styles.xmark} />
          </span>
        </legend>
        <div className={styles.inputwrapper}>
          <input
            onChange={(e) =>
              confirmPasswordHandlers.setConfirmPassword(e.target.value)
            }
            onFocus={() =>
              confirmPasswordHandlers.setConfirmPasswordFocus(true)
            }
            onBlur={() =>
              confirmPasswordHandlers.setConfirmPasswordFocus(false)
            }
            type={showPassword ? "password" : "text"}
            id="password"
            name="password"
          />
          <span
            onClick={showPasswordHandler}
            onMouseEnter={() => setConfirmPasswordHover(!confirmPasswordHover)}
            onMouseLeave={() => setConfirmPasswordHover(!confirmPasswordHover)}
          >
            {confirmPasswordHover || showPassword ? (
              <AiFillEye />
            ) : (
              <AiFillEyeInvisible />
            )}
          </span>
        </div>
      </fieldset>
      <button
        className={styles.formSignUpButton}
        disabled={
          !values.emailValues.emailValid ||
          !values.passwordValues.passwordValid ||
          !values.validMatch
        }
        style={{ cursor: !values.validInputs ? "not-allowed" : "pointer" }}
      >
        Sign Up
      </button>
      <div className={styles.crossLine}>
        <div></div>
        <span>OR</span>
        <div></div>
      </div>
      <button
        className={styles.formLoginButton}
        onClick={() => setShowLoginForm(true)}
      >
        Login
      </button>
    </form>
  );
};
export default SignUpForm;
