import React from "react";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import styles from "../../../styles.module.scss";
import { ConfirmPasswordFieldProps } from "./confirmPasswordField.props";

const ConfirmPasswordField = ({
  showPassword,
  confirmPasswordValid,
  errRef,
  confirmPasswordFocus,
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
        {validMatch && passwordValid ? (
          <span className={styles.show}>
            <TbCircleCheck className={styles.correct} />
          </span>
        ) : (
          !validMatch && (
            <span className={styles.show}>
              <TbCircleX className={styles.xmark} />
            </span>
          )
        )}
      </legend>

      <div className={styles.inputwrapper}>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setConfirmPasswordFocus(true)}
          onBlur={() => setConfirmPasswordFocus(false)}
          type={showPassword ? "text" : "password"}
          id="confirmpwd"
          name="confirmpwd"
          required
          aria-invalid={confirmPasswordValid ? "true" : "false"}
          aria-describedby="confirmpwd-error"
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
        id="confirmpwd-error"
        style={{
          opacity: !validMatch && confirmPasswordFocus ? 1 : 0,
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
