import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useLoginForm } from "./useLoginForm";
import { useDispatch } from "react-redux";
import { formSwitch } from "../../../../store/display-state-slice";
import styles from "./styles.module.scss";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { handlers, values } = useLoginForm();
  const { passwordHover, showPassword } = values.passwordValues;
  const { showPasswordHandler, emailHandlers, passwordHandlers, handleSumbit } =
    handlers;

  return (
    <>
      <div className={values.warningCredentialsStlye.join(" ")}>
        {values.userMsg}
      </div>
      {/* {values.validCredentials && (
      )} */}

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
              // onMouseEnter={() => setPasswordHover(!passwordHover)}
              // onMouseLeave={() => setPasswordHover(!passwordHover)}
            >
              {passwordHover ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
        </fieldset>

        <button
          type="submit"
          className={styles.formLoginButton}
          disabled={
            !values.emailValues.emailValid ||
            !values.passwordValues.passwordValid
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
          onClick={() => dispatch(formSwitch())}
        >
          Sign Up
        </button>
      </form>
    </>
  );
};
export default LoginForm;
