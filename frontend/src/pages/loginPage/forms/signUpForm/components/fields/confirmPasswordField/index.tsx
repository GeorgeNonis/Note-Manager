import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import styles from "../../../styles.module.scss";
import { ConfirmPasswordFieldProps } from "./confirmPasswordField.props";
import {
  StyledCheckMark,
  StyledCorrect,
  StyledPasswordNote,
  StyledXmark,
} from "../passwordField/passwordField.styles";

const ConfirmPasswordField = ({
  showPassword,
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
          <StyledCheckMark show={validMatch && passwordValid}>
            <StyledCorrect />
          </StyledCheckMark>
        ) : (
          !validMatch && (
            <StyledCheckMark show={!validMatch}>
              <StyledXmark />
            </StyledCheckMark>
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
          aria-invalid={passwordValid ? "true" : "false"}
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

      <StyledPasswordNote
        ref={errRef}
        id="confirmpwd-error"
        invalidPassword={!validMatch && confirmPasswordFocus}
      >
        <AiOutlineInfoCircle />
        <span> Must match your New Password</span>
      </StyledPasswordNote>
    </fieldset>
  );
};

export default ConfirmPasswordField;
