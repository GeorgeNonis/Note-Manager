import ReactDOM from "react-dom";
import { useSignUpForm } from "./useSignUpForm";
import AvatarOptions from "../../../../components/modals/avataroptions/avatarOptions";
import default_avatar_pic from "../../../../../images/default_avatar.png";
// import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { formSwitch } from "../../../../store/display-state-slice";
import { Transition } from "react-transition-group";
import {
  ChangeField,
  ConfirmPasswordField,
  EmailField,
  PasswordField,
} from "./components";
import { CrossLine } from "../loginForm/components";
import Button from "../../../../components/Atoms/Button";
import { StyledForm } from "./signUpForm.styles";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { handlers, values } = useSignUpForm();
  const { emailField, passwordField, confirmPasswordField, changeField } =
    values;

  return (
    <>
      <Transition
        in={values.changeAvatar}
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        {(transState) =>
          ReactDOM.createPortal(
            <AvatarOptions
              transitionState={transState}
              closeModal={handlers.setChangeAvatar}
              avatarHandler={handlers.avatarHandler}
            />,
            document.getElementById("avataroptions")!
          )
        }
      </Transition>
      <StyledForm onSubmit={handlers.handleSumbit}>
        <EmailField {...emailField} />
        <PasswordField {...passwordField} />
        <ConfirmPasswordField {...confirmPasswordField} />
        <ChangeField default_avatar_pic={default_avatar_pic} {...changeField} />
        <Button
          disabled={values.signUpProceed}
          loading={values.requestState}
          type="submit"
        >
          Sign Up
        </Button>
        <CrossLine />
        <Button onClick={() => dispatch(formSwitch())}>Login</Button>
      </StyledForm>
    </>
  );
};
export default SignUpForm;
