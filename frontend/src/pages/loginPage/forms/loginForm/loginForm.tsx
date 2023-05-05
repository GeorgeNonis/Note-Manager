import { Dispatch } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useLoginForm } from "./useLoginForm";
import styles from "./styles.module.scss";

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
    handleSumbit,
  } = handlers;

  console.log(values.validInputs);
  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      <fieldset>
        <legend>E-Mail:</legend>
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
        <legend>Password:</legend>
        <div className={styles.inputwrapper}>
          <input
            onChange={(e) => passwordHandlers.setPassword(e.target.value)}
            onFocus={() => passwordHandlers.setPasswordFocus(true)}
            onBlur={() => passwordHandlers.setPasswordFocus(false)}
            type={!showPassword ? "password" : "text"}
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

      <button
        type="submit"
        className={styles.formLoginButton}
        disabled={
          !values.emailValues.emailValid || !values.passwordValues.passwordValid
        }
        // style={{ cursor: !values.validInputs ? "not-allowed" : "pointer" }}
        style={{ cursor: !values.validInputs ? "not-allowed" : "pointer" }}
      >
        Login
      </button>
      <div className={styles.crossLine}>
        <div></div>
        <span>OR</span>
        <div></div>
      </div>
      <button
        type="button"
        className={styles.formSignUpButton}
        onClick={() => setShowLoginForm(false)}
      >
        Sign Up
      </button>
    </form>
  );
};
export default LoginForm;
