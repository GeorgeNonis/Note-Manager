import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import styles from "../../../styles.module.scss";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { PasswordFieldProps } from "./passwordField.props";
import {
  StyledCheckMark,
  StyledCorrect,
  StyledPasswordNote,
  StyledXmark,
} from "./passwordField.styles";

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
          <StyledCheckMark show={passwordValid}>
            <StyledCorrect />
          </StyledCheckMark>
        )}
        {password && !passwordValid && (
          <StyledCheckMark show={!!(password && !passwordValid)}>
            <StyledXmark />
          </StyledCheckMark>
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
      <StyledPasswordNote
        ref={errRef}
        id="pwdnote"
        invalidPassword={!!(passwordFocus && !passwordValid && password)}
      >
        <AiOutlineInfoCircle />
        <span>
          Minimum four characters, first one uppercase letter, least one number
        </span>
      </StyledPasswordNote>
    </fieldset>
  );
};
export default PasswordField;
