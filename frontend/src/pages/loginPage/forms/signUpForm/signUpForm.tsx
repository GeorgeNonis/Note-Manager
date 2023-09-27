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
  PasswordField,
} from "./components";

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
        <EmailField {...emailField} emailAlreadyInUse />
        <PasswordField {...passwordField} />
        <ConfirmPasswordField
          {...confirmPasswordField}
          confirmPasswordconfirmPasswordFocus
          confirmPasswordconfirmPasswordValid
        />
        <ChangeField default_avatar_pic={default_avatar_pic} {...changeField} />
        <button
          type="submit"
          className={styles.formSignUpButton}
          disabled={
            !emailField.emailValid ||
            !passwordField.passwordValid ||
            !values.validMatch ||
            emailAlreadyInUse ||
            values.requestState
          }
          style={{
            cursor:
              !values.validInputs || values.requestState
                ? "not-allowed"
                : "pointer",
          }}
        >
          Sign Up
        </button>
        <div className={styles.crossLine}>
          <div></div>
          <span className={styles.or}>OR</span>
          <div></div>
        </div>
        <button
          disabled={values.requestState}
          style={{
            cursor: values.requestState ? "not-allowed" : "pointer",
          }}
          type="button"
          className={styles.formLoginButton}
          onClick={() => dispatch(formSwitch())}
        >
          Login
        </button>
      </form>
    </>
  );
};
export default SignUpForm;
