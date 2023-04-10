import { SignUpButtonProps } from "../interfaces";

const SignUpButton = ({
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
      Sign Up
    </button>
  );
};
export default SignUpButton;
