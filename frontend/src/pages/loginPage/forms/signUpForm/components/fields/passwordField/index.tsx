import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { PasswordFieldProps } from "./passwordField.props";
import {
  StyledCheckMark,
  StyledCorrect,
  StyledFieldSet,
  StyledPasswordNote,
  StyledXmark,
} from "../styles";
import { StyledInputWrapper, StyledSpan } from "../styles";
import { Input } from "../../../../../../../components/Atoms";

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
    <StyledFieldSet>
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
        <Input
          backgroundUnset
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
    </StyledFieldSet>
  );
};
export default PasswordField;
