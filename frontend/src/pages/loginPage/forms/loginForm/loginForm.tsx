import { useLoginForm } from "./useLoginForm";
import { useDispatch } from "react-redux";
import { formSwitch } from "../../../../store/display-state-slice";
import { CrossLine, EmailField, PasswordField } from "./components";
import { Form } from "../../../../components/Molecules";
import { Button } from "noniscomponents";

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
          theme={"#f26716"}
          size={"s"}
        >
          Login
        </Button>
        <CrossLine />
        <Button
          onClick={() => dispatch(formSwitch())}
          theme={"#f26716"}
          size={"s"}
        >
          Sign Up
        </Button>
      </Form>
    </>
  );
};
export default LoginForm;
