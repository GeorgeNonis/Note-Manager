import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import styles from "../../../styles.module.scss";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { PasswordFieldProps } from "./passwordField.props";

const PasswordField = ({
  errRef,
  showPassword,
  password,
  passwordValid,
  passwordFocus,
  passwordHover,
  setPassword,
  setPasswordFocus,
  showPasswordHandler,
}: PasswordFieldProps) => {
  return (
    <fieldset>
      <legend>
        Password:
        {passwordValid && (
          <span className={passwordValid ? styles.show : styles.hide}>
            <TbCircleCheck className={styles.correct} />
          </span>
        )}
        {password && !passwordValid && (
          <span
            className={password && !passwordValid ? styles.show : styles.hide}
          >
            <TbCircleX className={styles.xmark} />
          </span>
        )}
      </legend>
      <div className={styles.inputwrapper}>
        <input
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          type={!showPassword ? "password" : "text"}
          id="password"
          name="password"
          required
          aria-invalid={passwordValid ? true : false}
          aria-describedby="pwdnote"
        />
        <span onClick={showPasswordHandler}>
          {passwordHover ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      </div>
      <p
        ref={errRef}
        id="pwdnote"
        style={{
          opacity: `${passwordFocus && !passwordValid && password ? 1 : 0}`,
        }}
        className={styles.show}
      >
        <AiOutlineInfoCircle />
        <span>
          Minimum four characters, first one uppercase letter, least one number
        </span>
      </p>
    </fieldset>
  );
};
export default PasswordField;
