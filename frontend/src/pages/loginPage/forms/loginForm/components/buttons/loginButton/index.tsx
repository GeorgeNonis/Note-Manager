import { LoginButtonProps } from "./loginButton.props";
import { StyledButton } from "./loginButton.styles";

const LoginButton = ({ validInputs }: LoginButtonProps) => {
  return (
    <StyledButton type="submit" disableButton={!validInputs}>
      Login
    </StyledButton>
  );
};
export default LoginButton;
