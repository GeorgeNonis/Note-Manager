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
import { StyledInput, StyledInputWrapper, StyledSpan } from "../styles";

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
      <StyledInputWrapper>
        <StyledInput
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
        <StyledSpan onClick={showPasswordHandler}>
          {passwordHover ? <AiFillEye /> : <AiFillEyeInvisible />}
        </StyledSpan>
      </StyledInputWrapper>
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
