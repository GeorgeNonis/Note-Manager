import { AiOutlineInfoCircle } from "react-icons/ai";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import styles from "../../../styles.module.scss";
import { EmailFieldProps } from "./emailField.props";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../../../../store/store";
import {
  StyledCheckMark,
  StyledCorrect,
  StyledPasswordNote,
  StyledXmark,
} from "../passwordField/passwordField.styles";

const EmailField = ({
  setEmail,
  setEmailFocus,
  emailRef,
  email,
  emailValid,
}: EmailFieldProps) => {
  const { emailAlreadyInUse } = useSelector(
    (state: IRootState) => state.displayState
  );
  const shouldDisplayError = email && (!emailValid || emailAlreadyInUse);
  const errorMessage = emailAlreadyInUse
    ? `Account already exists with this email`
    : `Must be a valid email`;

  return (
    <fieldset>
      <legend>
        E-Mail:
        {emailValid && !emailAlreadyInUse && (
          <StyledCheckMark show={emailValid && !emailAlreadyInUse}>
            <StyledCorrect />
          </StyledCheckMark>
        )}
        {shouldDisplayError && (
          <StyledCheckMark show={shouldDisplayError}>
            <StyledXmark />
          </StyledCheckMark>
        )}
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
      <StyledPasswordNote invalidPassword={!!shouldDisplayError}>
        <AiOutlineInfoCircle />
        <span>{errorMessage}</span>
      </StyledPasswordNote>
    </fieldset>
  );
};

export default EmailField;
