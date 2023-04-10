import styles from "./styles.module.scss";
import { useLoginPage } from "./useLoginPage";
import SignUpForm from "./forms/signUpForm";
import LoginForm from "./forms/loginForm";

const LoginPage = () => {
  const { showLoginForm, setShowLoginForm } = useLoginPage();

  return (
    <main className={styles.main}>
      {showLoginForm ? (
        <LoginForm setShowLoginForm={setShowLoginForm} />
      ) : (
        <SignUpForm setShowLoginForm={setShowLoginForm} />
      )}
    </main>
  );
};
export default LoginPage;
