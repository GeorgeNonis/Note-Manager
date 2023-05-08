import styles from "./styles.module.scss";
import { useLoginPage } from "./useLoginPage";
import SignUpForm from "./forms/signUpForm";
import LoginForm from "./forms/loginForm";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

const LoginPage = () => {
  const { showLoginForm } = useSelector(
    (state: IRootState) => state.displayState
  );
  return (
    <main className={styles.main}>
      {!showLoginForm ? <LoginForm /> : <SignUpForm />}
    </main>
  );
};
export default LoginPage;
