import { Input } from "../../../../../../../components/Atoms";
import { StyledFieldSet } from "../../../../signUpForm/components/fields/styles";
import { EmailFieldProps } from "./email.props";

const EmailField = ({ emailRef, setEmail, setEmailFocus }: EmailFieldProps) => {
  return (
    <StyledFieldSet>
      <legend>E-Mail:</legend>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        type="email"
        id="email"
        name="email"
        ref={emailRef}
      />
    </StyledFieldSet>
  );
};
export default EmailField;
