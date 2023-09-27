import styles from "../../../styles.module.scss";
import { SignUpButtonProps } from "./signUp.props";

const SignUpButton = ({
  emailAlreadyInUse,
  emailValid,
  passwordValid,
  requestState,
  validInputs,
  validMatch,
}: SignUpButtonProps) => {
  return (
    <button
      type="submit"
      className={styles.formSignUpButton}
      disabled={
        !emailValid ||
        !passwordValid ||
        !validMatch ||
        emailAlreadyInUse ||
        requestState
      }
      style={{
        cursor: !validInputs || requestState ? "not-allowed" : "pointer",
      }}
    >
      Sign Up
    </button>
  );
};
export default SignUpButton;
