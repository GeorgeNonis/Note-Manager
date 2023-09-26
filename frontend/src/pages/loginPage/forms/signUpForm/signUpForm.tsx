import ReactDOM from "react-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { formSwitch } from "../../../../store/display-state-slice";
import { Transition } from "react-transition-group";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { handlers, values } = useSignUpForm();
  const { emailAlreadyInUse } = useSelector(
    (state: IRootState) => state.displayState
  );

  const { confirmPasswordHover, passwordHover, showPassword } =
    values.passwordValues;
  const { emailHandlers, passwordHandlers, confirmPasswordHandlers } = handlers;
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
        <fieldset>
          <legend>
            E-Mail:
            {values.emailValues.emailValid && !emailAlreadyInUse && (
              <span
                className={
                  values.emailValues.emailValid && !emailAlreadyInUse
                    ? styles.show
                    : styles.hide
                }
              >
                <TbCircleCheck className={styles.correct} />
              </span>
            )}
            {(values.emailValues.email && !values.emailValues.emailValid) ||
              (emailAlreadyInUse && (
                <span
                  className={
                    (values.emailValues.email &&
                      !values.emailValues.emailValid) ||
                    emailAlreadyInUse
                      ? styles.show
                      : styles.hide
                  }
                >
                  <TbCircleX className={styles.xmark} />
                </span>
              ))}
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
            <span>
              {!emailAlreadyInUse
                ? `Must be a valid email`
                : `Account already exists with this email`}
            </span>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            Password:
            {values.passwordValues.passwordValid && (
              <span
                className={
                  values.passwordValues.passwordValid
                    ? styles.show
                    : styles.hide
                }
              >
                <TbCircleCheck className={styles.correct} />
              </span>
            )}
            {values.passwordValues.password &&
              !values.passwordValues.passwordValid && (
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
              )}
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
            <span onClick={handlers.showPasswordHandler}>
              {passwordHover ? <AiFillEye /> : <AiFillEyeInvisible />}
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
            <span>
              Minimum four characters, first one uppercase letter, least one
              number
            </span>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            Confirm Password:
            {values.validMatch && values.passwordValues.passwordValid && (
              <span
                className={
                  values.validMatch && values.passwordValues.passwordValid
                    ? styles.show
                    : styles.hide
                }
              >
                <TbCircleCheck className={styles.correct} />
              </span>
            )}
            {!values.validMatch && (
              <span className={styles.show}>
                <TbCircleX className={styles.xmark} />
              </span>
            )}
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
              id="confirmpwd"
              name="confirmpwd"
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
                !values.validMatch &&
                values.confirmPasswordValues.confirmPasswordFocus
                  ? 1
                  : 0
              }`,
            }}
            className={styles.show}
          >
            <AiOutlineInfoCircle />
            <span> Must match your New Password</span>
          </p>
        </fieldset>
        <fieldset className={styles.fieldsetimage}>
          <img
            src={!values.default_avatar ? values.avatar : default_avatar_pic}
            alt="avatar_image"
          />
          <div className={styles.fieldsetdiv}>
            <button
              disabled={values.requestState}
              style={{
                cursor: values.requestState ? "not-allowed" : "pointer",
              }}
              onClick={() => handlers.setChangeAvatar(true)}
              type="button"
            >
              Change
            </button>
            <button
              disabled={values.requestState}
              style={{
                cursor: values.requestState ? "not-allowed" : "pointer",
              }}
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
