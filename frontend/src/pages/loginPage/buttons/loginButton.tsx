import { SignUpButtonProps } from "../interfaces";

const LoginButton = ({
  styles,
  emailValid,
  passwordValid,
  validMatch,
  validInputs,
}: SignUpButtonProps) => {
  return (
    <button
      className={styles.formsignupbutton}
      disabled={!emailValid || !passwordValid || !validMatch}
      style={{ cursor: !validInputs ? "not-allowed" : "pointer" }}
    >
      Login
    </button>
  );
};
export default LoginButton;
