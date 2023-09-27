import ReactDOM from "react-dom";
import { useSignUpForm } from "./useSignUpForm";
import AvatarOptions from "../../../../components/modals/avataroptions/avatarOptions";
import default_avatar_pic from "../../../../../images/default_avatar.png";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { formSwitch } from "../../../../store/display-state-slice";
import { Transition } from "react-transition-group";
import {
  ChangeField,
  ConfirmPasswordField,
  EmailField,
  LoginButton,
  PasswordField,
  SignUpButton,
} from "./components";
import { CrossLine } from "../loginForm/components";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { handlers, values } = useSignUpForm();
  const { emailField, passwordField, confirmPasswordField, changeField } =
    values;
  const { emailAlreadyInUse } = useSelector(
    (state: IRootState) => state.displayState
  );

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
      <form className={styles.form} onSubmit={handlers.handleSumbit}>
        <EmailField {...emailField} emailAlreadyInUse={emailAlreadyInUse} />
        <PasswordField {...passwordField} />
        <ConfirmPasswordField
          {...confirmPasswordField}
          confirmPasswordFocus
          confirmPasswordValid
        />
        <ChangeField default_avatar_pic={default_avatar_pic} {...changeField} />
        <SignUpButton
          emailAlreadyInUse={emailAlreadyInUse}
          requestState={values.requestState}
          validMatch={values.validInputs}
          validInputs={values.validInputs}
          passwordValid={values.passwordField.passwordValid}
          emailValid={values.emailField.emailValid}
        />
        <CrossLine />
        <LoginButton
          onClick={() => dispatch(formSwitch())}
          requestState={values.requestState}
        />
      </form>
    </>
  );
};
export default SignUpForm;
