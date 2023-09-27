import styles from "../../../styles.module.scss";
import { LoginButtonProps } from "./login.props";

const LoginButton = ({ onClick, requestState }: LoginButtonProps) => {
  return (
    <button
      disabled={requestState}
      style={{
        cursor: requestState ? "not-allowed" : "pointer",
      }}
      type="button"
      className={styles.formLoginButton}
      onClick={onClick}
    >
      Login
    </button>
  );
};
export default LoginButton;
