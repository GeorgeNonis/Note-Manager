import ReactDOM from "react-dom";
import { Dispatch } from "react";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { TbCircleX, TbCircleCheck } from "react-icons/tb";
import { useSignUpForm } from "./useSignUpForm";
import AvatarOptions from "../../../../components/modals/avataroptions/avatarOptions";
import default_avatar_pic from "../../../../../images/default_avatar.png";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";

const SignUpForm = ({
  setShowLoginForm,
}: {
  setShowLoginForm: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handlers, values } = useSignUpForm();
  const { emailAlreadyInUse } = useSelector(
    (state: IRootState) => state.displayState
  );

  const { confirmPasswordHover, passwordHover, showPassword } =
    values.passwordValues;
  const { emailHandlers, passwordHandlers, confirmPasswordHandlers } = handlers;

  return (
    <>
      {values.changeAvatar &&
        ReactDOM.createPortal(
          <AvatarOptions
            closeModal={handlers.setChangeAvatar}
            avatarHandler={handlers.avatarHandler}
          />,
          document.getElementById("avataroptions")!
        )}
      <form
        className={styles.form}
        onSubmit={handlers.handleSumbit}
        // encType="multipart/form-data"
      >
        <fieldset>
          <legend>
            E-Mail:
            <span
              className={
                values.emailValues.emailValid && !emailAlreadyInUse
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleCheck className={styles.correct} />
            </span>
            <span
              className={
                (values.emailValues.email && !values.emailValues.emailValid) ||
                emailAlreadyInUse
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleX className={styles.xmark} />
            </span>
          </legend>
          <input
            className={styles.formEmailInput}
            onChange={(e) => emailHandlers.setEmail(e.target.value)}
            onFocus={() => emailHandlers.setEmailFocus(true)}
            onBlur={() => emailHandlers.setEmailFocus(false)}
            type="email"
            id="email"
            name="email"
            ref={values.emailValues.emailRef}
          />
          <p
            style={{
              opacity: `${
                (!values.emailValues.emailValid &&
                  values.emailValues.emailFocus &&
                  values.emailValues.email) ||
                emailAlreadyInUse
                  ? 1
                  : 0
              }`,
            }}
            className={styles.show}
          >
            <AiOutlineInfoCircle />
            <h3>
              {!emailAlreadyInUse
                ? `Must be a valid email`
                : `Account already exists with this email`}
            </h3>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            Password:
            <span
              className={
                values.passwordValues.passwordValid ? styles.show : styles.hide
              }
            >
              <TbCircleCheck className={styles.correct} />
            </span>
            <span
              className={
                values.passwordValues.password &&
                !values.passwordValues.passwordValid
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleX className={styles.xmark} />
            </span>
          </legend>
          <div className={styles.inputwrapper}>
            <input
              onChange={(e) => passwordHandlers.setPassword(e.target.value)}
              onFocus={() => passwordHandlers.setPasswordFocus(true)}
              onBlur={() => passwordHandlers.setPasswordFocus(false)}
              type={!showPassword ? "password" : "text"}
              id="password"
              name="password"
              required
              aria-invalid={values.passwordValues.passwordValid ? true : false}
              aria-describedby="pwdnote"
            />
            <span
              onClick={handlers.showPasswordHandler}
              onMouseEnter={() => handlers.setPasswordHover(!passwordHover)}
              onMouseLeave={() => handlers.setPasswordHover(!passwordHover)}
            >
              {passwordHover || showPassword ? (
                <AiFillEye />
              ) : (
                <AiFillEyeInvisible />
              )}
            </span>
          </div>
          <p
            ref={values.errRef}
            id="pwdnote"
            style={{
              opacity: `${
                values.passwordValues.passwordFocus &&
                !values.passwordValues.passwordValid &&
                values.passwordValues.password
                  ? 1
                  : 0
              }`,
            }}
            className={styles.show}
          >
            <AiOutlineInfoCircle />
            <h3>
              Minimum four characters, first one uppercase letter, least one
              number
            </h3>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            Confirm Password:
            <span
              className={
                values.validMatch && values.passwordValues.passwordValid
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleCheck className={styles.correct} />
            </span>
            <span
              className={
                !values.validMatch ||
                (values.confirmPasswordValues.confirmPassword.length &&
                  !values.passwordValues.passwordValid)
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleX className={styles.xmark} />
            </span>
          </legend>
          <div className={styles.inputwrapper}>
            <input
              onChange={(e) =>
                confirmPasswordHandlers.setConfirmPassword(e.target.value)
              }
              onFocus={() =>
                confirmPasswordHandlers.setConfirmPasswordFocus(true)
              }
              onBlur={() =>
                confirmPasswordHandlers.setConfirmPasswordFocus(false)
              }
              type={!showPassword ? "password" : "text"}
              id="password"
              name="password"
              required
              aria-invalid={
                values.confirmPasswordValues.confirmPasswordValid ? true : false
              }
              aria-describedby="confirmpwd"
            />
            <span
              onClick={handlers.showPasswordHandler}
              onMouseEnter={() =>
                handlers.setConfirmPasswordHover(!confirmPasswordHover)
              }
              onMouseLeave={() =>
                handlers.setConfirmPasswordHover(!confirmPasswordHover)
              }
            >
              {confirmPasswordHover || showPassword ? (
                <AiFillEye />
              ) : (
                <AiFillEyeInvisible />
              )}
            </span>
          </div>
          <p
            ref={values.errRef}
            id="confirmpwd"
            style={{
              opacity: `${
                (values.confirmPasswordValues.confirmPasswordFocus &&
                  !values.validMatch) ||
                (values.confirmPasswordValues.confirmPassword.length &&
                  !values.passwordValues.passwordValid)
                  ? 1
                  : 0
              }`,
            }}
            className={styles.show}
          >
            <AiOutlineInfoCircle />
            <h3> Must match your New Password</h3>
          </p>
        </fieldset>
        <fieldset className={styles.fieldsetimage}>
          <img
            src={!values.default_avatar ? values.avatar : default_avatar_pic}
            alt="avatar_image"
          />
          <div className={styles.fieldsetdiv}>
            <button
              onClick={() => handlers.setChangeAvatar(true)}
              type="button"
            >
              Change
            </button>
            <button
              onClick={() => handlers.setDefaultAvatar(true)}
              type="button"
            >
              Remove
            </button>
          </div>
        </fieldset>
        <button
          type="submit"
          className={styles.formSignUpButton}
          disabled={
            !values.emailValues.emailValid ||
            !values.passwordValues.passwordValid ||
            !values.validMatch ||
            emailAlreadyInUse
          }
          style={{ cursor: !values.validInputs ? "not-allowed" : "pointer" }}
        >
          Sign Up
        </button>
        <div className={styles.crossLine}>
          <div></div>
          <span>OR</span>
          <div></div>
        </div>
        <button
          type="button"
          className={styles.formLoginButton}
          onClick={() => setShowLoginForm(true)}
        >
          Login
        </button>
      </form>
    </>
  );
};
export default SignUpForm;
