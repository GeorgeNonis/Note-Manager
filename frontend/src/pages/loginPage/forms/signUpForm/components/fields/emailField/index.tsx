import { AiOutlineInfoCircle } from "react-icons/ai";
import { EmailFieldProps } from "./emailField.props";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../../../../store/store";
import {
  StyledCheckMark,
  StyledCorrect,
  StyledFieldSet,
  StyledPasswordNote,
  StyledXmark,
} from "../styles";
import { Input } from "../../../../../../../components/Atoms";

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
    <StyledFieldSet>
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
      <Input
        css={{ bgc: "$inputShadow !important" }}
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
    </StyledFieldSet>
  );
};

export default EmailField;
