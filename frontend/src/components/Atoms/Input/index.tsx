import { forwardRef } from "react";
import { InputProps } from "./input.props";
import { StyledInput } from "./input.styles";

/**
 * Input build on StyledInput used primarily for the forms across app
 * @param {boolean} backgroundUnset - If true, will override the default background.
 * @param {React.Ref<HTMLInputElement>} ref - Ref forwarded for DOM access.
 * @param {...any} props - Spread the rest of the properties to the underlying input.
 *
 * @example
 * <Input backgroundUnset={true} type="text" placeholder="Enter text"/>
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ backgroundUnset, ...props }, ref) => (
    <StyledInput backgroundUnset={backgroundUnset} required {...props} />
  )
);
export default Input;
