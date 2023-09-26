import { EmailFieldProps } from "./email.props";
import { StyledEmailInput } from "./emailField.styles";

const EmailField = ({ emailRef, setEmail, setEmailFocus }: EmailFieldProps) => {
  return (
    <fieldset>
      <legend>E-Mail:</legend>
      <StyledEmailInput
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        type="email"
        id="email"
        name="email"
        ref={emailRef}
      />
    </fieldset>
  );
};
export default EmailField;
