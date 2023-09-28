import styles from "./styles.module.scss";
import { SignUpForm, LoginForm } from "./forms";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { showLoginForm } = useSelector(
    (state: IRootState) => state.displayState
  );
  return (
    <>
      <ToastContainer />
      <main className={styles.main}>
        {!showLoginForm ? <LoginForm /> : <SignUpForm />}
      </main>
    </>
  );
};
export default LoginPage;
