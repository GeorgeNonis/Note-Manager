import { useLoginForm } from "./useLoginForm";
import { useDispatch } from "react-redux";
import { formSwitch } from "../../../../store/display-state-slice";
import styles from "./styles.module.scss";
import {
  CrossLine,
  EmailField,
  LoginButton,
  PasswordField,
  SignUpButton,
} from "./components";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { handlers, emailField, passwordField, loginButtonValues } =
    useLoginForm();
  const { handleSumbit } = handlers;

  return (
    <>
      <form className={styles.form} onSubmit={handleSumbit}>
        <EmailField {...emailField} />
        <PasswordField {...passwordField} />
        <LoginButton {...loginButtonValues} />
        <CrossLine />
        <SignUpButton onClick={() => dispatch(formSwitch())} />
      </form>
    </>
  );
};
export default LoginForm;
