import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PasswordFieldProps } from "./passwordField.props";
import { StyledPasswordField, StyledWrapper } from "./passwordField.styles";

const PasswordField = ({
  showPassword,
  passwordHover,
  setPassword,
  setPasswordFocus,
  showPasswordHandler,
}: PasswordFieldProps) => {
  return (
    <fieldset>
      <legend>Password:</legend>
      <StyledWrapper>
        <StyledPasswordField
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          type={!showPassword ? "password" : "text"}
          id="password"
          name="password"
        />
        <span onClick={showPasswordHandler}>
          {passwordHover ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </StyledWrapper>
    </fieldset>
  );
};
export default PasswordField;
