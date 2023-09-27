import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import styles from "../../../styles.module.scss";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { ConfirmPasswordFieldProps } from "./confirmPasswordField.props";

const ConfirmPasswordField = ({
  showPassword,
  confirmPasswordconfirmPasswordValid,
  errRef,
  confirmPasswordconfirmPasswordFocus,
  passwordValid,
  validMatch,
  setConfirmPasswordHover,
  confirmPasswordHover,
  setConfirmPassword,
  setConfirmPasswordFocus,
  showPasswordHandler,
}: ConfirmPasswordFieldProps) => {
  return (
    <fieldset>
      <legend>
        Confirm Password:
        {validMatch && passwordValid && (
          <span
            className={validMatch && passwordValid ? styles.show : styles.hide}
          >
            <TbCircleCheck className={styles.correct} />
          </span>
        )}
        {!validMatch && (
          <span className={styles.show}>
            <TbCircleX className={styles.xmark} />
          </span>
        )}
      </legend>
      <div className={styles.inputwrapper}>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setConfirmPasswordFocus(true)}
          onBlur={() => setConfirmPasswordFocus(false)}
          type={!showPassword ? "password" : "text"}
          id="confirmpwd"
          name="confirmpwd"
          required
          aria-invalid={confirmPasswordconfirmPasswordValid ? true : false}
          aria-describedby="confirmpwd"
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
      <p
        ref={errRef}
        id="confirmpwd"
        style={{
          opacity: `${
            !validMatch && confirmPasswordconfirmPasswordFocus ? 1 : 0
          }`,
        }}
        className={styles.show}
      >
        <AiOutlineInfoCircle />
        <span> Must match your New Password</span>
      </p>
    </fieldset>
  );
};
export default ConfirmPasswordField;
