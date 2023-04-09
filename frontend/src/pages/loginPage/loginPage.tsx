import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import styles from "./styles.module.scss";
import { useLoginPage } from "./useLoginPage";

const LoginPage = () => {
  const { handlers, values } = useLoginPage();
  const { confirmPasswordHover, passwordHover } = values;
  const { setPasswordHover, setConfirmPasswordHover } = handlers;
  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <fieldset>
          <legend>E-Mail</legend>
          <input
            type="email"
            id="email"
            name="email"
            ref={values.emailValues.emailRef}
          />
        </fieldset>
        <fieldset>
          <legend>Password</legend>
          <input type="password" id="password" name="password" />
          <span
            onMouseEnter={() => setPasswordHover(true)}
            onMouseLeave={() => setPasswordHover(false)}
          >
            {passwordHover ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        </fieldset>
        <fieldset>
          <legend>Confirm Password</legend>
          <input type="password" id="password" name="password" />
          <span
            onMouseEnter={() => setConfirmPasswordHover(true)}
            onMouseLeave={() => setConfirmPasswordHover(false)}
          >
            {confirmPasswordHover ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        </fieldset>
        <button className={styles.formloginbutton}>Login</button>
      </form>
    </main>
  );
};
export default LoginPage;
