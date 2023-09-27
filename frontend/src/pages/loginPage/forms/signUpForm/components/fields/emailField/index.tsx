import { AiOutlineInfoCircle } from "react-icons/ai";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import styles from "../../../styles.module.scss";
import { EmailFieldProps } from "./emailField.props";

const EmailField = ({
  setEmail,
  setEmailFocus,
  emailRef,
  email,
  emailAlreadyInUse,
  emailValid,
  emailFocus,
}: EmailFieldProps) => {
  return (
    <fieldset>
      <legend>
        E-Mail:
        {emailValid && !emailAlreadyInUse && (
          <span
            className={
              emailValid && !emailAlreadyInUse ? styles.show : styles.hide
            }
          >
            <TbCircleCheck className={styles.correct} />
          </span>
        )}
        {(email && !emailValid) ||
          (emailAlreadyInUse && (
            <span
              className={
                (email && !emailValid) || emailAlreadyInUse
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
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        type="email"
        id="email"
        name="email"
        ref={emailRef}
      />
      <p
        style={{
          opacity: `${
            (!emailValid && emailFocus && email) || emailAlreadyInUse ? 1 : 0
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
  );
};
export default EmailField;
