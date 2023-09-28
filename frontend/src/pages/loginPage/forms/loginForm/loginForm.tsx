import { useLoginForm } from "./useLoginForm";
import { useDispatch } from "react-redux";
import { formSwitch } from "../../../../store/display-state-slice";
import { CrossLine, EmailField, PasswordField } from "./components";
import Button from "../../../../components/Atoms/Button";
import { Form } from "../../../../components/Molecules";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { handlers, emailField, passwordField, loginButtonValues, loading } =
    useLoginForm();
  const { handleSumbit } = handlers;

  return (
    <>
      <Form onSubmit={handleSumbit}>
        <EmailField {...emailField} />
        <PasswordField {...passwordField} />
        <Button
          disabled={!loginButtonValues.validInputs || loading}
          loading={loading}
        >
          Login
        </Button>
        <CrossLine />
        <Button onClick={() => dispatch(formSwitch())}>Sign Up</Button>
      </Form>
    </>
  );
};
export default LoginForm;
