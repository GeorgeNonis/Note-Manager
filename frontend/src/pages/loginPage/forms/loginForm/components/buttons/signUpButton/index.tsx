import { StyledButton } from "../loginButton/loginButton.styles";

const SignUpButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      Sign Up
    </StyledButton>
  );
};
export default SignUpButton;
