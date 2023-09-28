import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PasswordFieldProps } from "./passwordField.props";
import { StyledWrapper } from "./passwordField.styles";
import { Input } from "../../../../../../../components/Atoms";
import { StyledFieldSet } from "../../../../signUpForm/components/fields/styles";

const PasswordField = ({
  showPassword,
  passwordHover,
  setPassword,
  showPasswordHandler,
}: PasswordFieldProps) => {
  return (
    <StyledFieldSet>
      <legend>Password:</legend>
      <StyledWrapper>
        <Input
          backgroundUnset
          onChange={(e) => setPassword(e.target.value)}
          type={!showPassword ? "password" : "text"}
          id="password"
          name="password"
        />
        <span onClick={showPasswordHandler}>
          {passwordHover ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </StyledWrapper>
    </StyledFieldSet>
  );
};
export default PasswordField;
