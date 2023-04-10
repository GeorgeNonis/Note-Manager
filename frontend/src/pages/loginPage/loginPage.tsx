import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TbCircleX, TbCircleCheck } from "react-icons/tb";
import styles from "./styles.module.scss";
import { useLoginPage } from "./useLoginPage";

const LoginPage = () => {
  const { handlers, values } = useLoginPage();
  const { confirmPasswordHover, passwordHover, showPassword } =
    values.passwordValues;
  const {
    setPasswordHover,
    setConfirmPasswordHover,
    showPasswordHandler,
    emailHandlers,
    passwordHandlers,
    confirmPasswordHandlers,
  } = handlers;

  return (
    <main className={styles.main}>
      <form className={styles.form}>
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
                (values.confirmPasswordValues.confirmPassword &&
                  !values.validMatch) ||
                !values.passwordValues.passwordValid
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleX className={styles.xmark} />
            </span>
          </legend>
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
        </fieldset>
        <button
          className={styles.formloginbutton}
          disabled={
            !values.emailValues.emailValid ||
            !values.passwordValues.passwordValid ||
            !values.validMatch
          }
          style={{ cursor: !values.validInputs ? "not-allowed" : "pointer" }}
        >
          Login
        </button>
      </form>
    </main>
  );
};
export default LoginPage;
